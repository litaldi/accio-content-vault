
import { SavedContent, Tag } from '@/types';

interface OfflineContent extends SavedContent {
  lastSyncedAt: string;
  isOfflineOnly?: boolean;
}

interface OfflineData {
  contents: OfflineContent[];
  tags: Tag[];
  lastFullSync: string;
}

class OfflineService {
  private dbName = 'AccioOfflineDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create content store
        if (!db.objectStoreNames.contains('contents')) {
          const contentStore = db.createObjectStore('contents', { keyPath: 'id' });
          contentStore.createIndex('userId', 'user_id', { unique: false });
          contentStore.createIndex('lastSynced', 'lastSyncedAt', { unique: false });
        }

        // Create tags store
        if (!db.objectStoreNames.contains('tags')) {
          const tagStore = db.createObjectStore('tags', { keyPath: 'id' });
          tagStore.createIndex('userId', 'user_id', { unique: false });
        }

        // Create sync metadata store
        if (!db.objectStoreNames.contains('syncMeta')) {
          db.createObjectStore('syncMeta', { keyPath: 'key' });
        }
      };
    });
  }

  async cacheContent(contents: SavedContent[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['contents'], 'readwrite');
    const store = transaction.objectStore('contents');
    
    const now = new Date().toISOString();
    
    for (const content of contents) {
      const offlineContent: OfflineContent = {
        ...content,
        lastSyncedAt: now
      };
      await this.putData(store, offlineContent);
    }

    // Update last sync time
    await this.setSyncMetadata('lastContentSync', now);
  }

  async cacheTags(tags: Tag[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['tags'], 'readwrite');
    const store = transaction.objectStore('tags');
    
    for (const tag of tags) {
      await this.putData(store, tag);
    }

    await this.setSyncMetadata('lastTagSync', new Date().toISOString());
  }

  async getOfflineContents(userId: string): Promise<OfflineContent[]> {
    if (!this.db) return [];

    const transaction = this.db.transaction(['contents'], 'readonly');
    const store = transaction.objectStore('contents');
    const index = store.index('userId');
    
    return this.getAllFromIndex(index, userId);
  }

  async getOfflineTags(userId: string): Promise<Tag[]> {
    if (!this.db) return [];

    const transaction = this.db.transaction(['tags'], 'readonly');
    const store = transaction.objectStore('tags');
    const index = store.index('userId');
    
    return this.getAllFromIndex(index, userId);
  }

  async addOfflineContent(content: SavedContent): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const offlineContent: OfflineContent = {
      ...content,
      lastSyncedAt: new Date().toISOString(),
      isOfflineOnly: true
    };

    const transaction = this.db.transaction(['contents'], 'readwrite');
    const store = transaction.objectStore('contents');
    await this.putData(store, offlineContent);
  }

  async getOfflineOnlyContents(userId: string): Promise<OfflineContent[]> {
    const contents = await this.getOfflineContents(userId);
    return contents.filter(content => content.isOfflineOnly);
  }

  async markContentSynced(contentId: string): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['contents'], 'readwrite');
    const store = transaction.objectStore('contents');
    
    const content = await this.getData(store, contentId);
    if (content) {
      content.isOfflineOnly = false;
      content.lastSyncedAt = new Date().toISOString();
      await this.putData(store, content);
    }
  }

  async clearOfflineData(): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['contents', 'tags', 'syncMeta'], 'readwrite');
    
    await Promise.all([
      this.clearStore(transaction.objectStore('contents')),
      this.clearStore(transaction.objectStore('tags')),
      this.clearStore(transaction.objectStore('syncMeta'))
    ]);
  }

  async getLastSyncTime(type: 'content' | 'tag'): Promise<string | null> {
    const key = type === 'content' ? 'lastContentSync' : 'lastTagSync';
    return this.getSyncMetadata(key);
  }

  // Helper methods
  private putData(store: IDBObjectStore, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private getData(store: IDBObjectStore, key: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private getAllFromIndex(index: IDBIndex, key: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = index.getAll(key);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  private clearStore(store: IDBObjectStore): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async setSyncMetadata(key: string, value: string): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['syncMeta'], 'readwrite');
    const store = transaction.objectStore('syncMeta');
    await this.putData(store, { key, value });
  }

  private async getSyncMetadata(key: string): Promise<string | null> {
    if (!this.db) return null;

    const transaction = this.db.transaction(['syncMeta'], 'readonly');
    const store = transaction.objectStore('syncMeta');
    const result = await this.getData(store, key);
    return result?.value || null;
  }
}

export const offlineService = new OfflineService();

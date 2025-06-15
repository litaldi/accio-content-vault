
interface VoiceSearchOptions {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
}

interface VoiceSearchResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export class VoiceSearchService {
  private recognition: any = null;
  private isListening = false;
  private onResultCallback?: (result: VoiceSearchResult) => void;
  private onEndCallback?: () => void;
  private onErrorCallback?: (error: string) => void;

  constructor() {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
    }
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  startListening(options: VoiceSearchOptions = {}): void {
    if (!this.recognition || this.isListening) return;

    this.recognition.continuous = options.continuous ?? false;
    this.recognition.interimResults = options.interimResults ?? true;
    this.recognition.lang = options.language ?? 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      const isFinal = result.isFinal;

      if (this.onResultCallback) {
        this.onResultCallback({ transcript, confidence, isFinal });
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      if (this.onErrorCallback) {
        this.onErrorCallback(event.error);
      }
    };

    this.recognition.start();
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  onRecognitionResult(callback: (result: VoiceSearchResult) => void): void {
    this.onResultCallback = callback;
  }

  onRecognitionEnd(callback: () => void): void {
    this.onEndCallback = callback;
  }

  onRecognitionError(callback: (error: string) => void): void {
    this.onErrorCallback = callback;
  }

  getIsListening(): boolean {
    return this.isListening;
  }
}

export const voiceSearchService = new VoiceSearchService();

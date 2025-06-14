
interface VoiceSearchConfig {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
  maxAlternatives?: number;
}

interface VoiceSearchResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

type VoiceSearchEventHandler = (result: VoiceSearchResult) => void;
type VoiceSearchErrorHandler = (error: string) => void;
type VoiceSearchEventCallback = () => void;

class VoiceSearchService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;
  private onResultHandler: VoiceSearchEventHandler | null = null;
  private onErrorHandler: VoiceSearchErrorHandler | null = null;
  private onStartHandler: VoiceSearchEventCallback | null = null;
  private onEndHandler: VoiceSearchEventCallback | null = null;

  constructor() {
    if (this.isSupported()) {
      this.initializeRecognition();
    }
  }

  isSupported(): boolean {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  private initializeRecognition(): void {
    const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new SpeechRecognitionAPI();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.recognition) return;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.onStartHandler?.();
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      
      this.onResultHandler?.({
        transcript,
        confidence,
        isFinal: result.isFinal
      });
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      this.isListening = false;
      let errorMessage = 'Speech recognition error occurred.';
      
      switch (event.error) {
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please allow microphone access.';
          break;
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'network':
          errorMessage = 'Network error occurred. Please check your connection.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      this.onErrorHandler?.(errorMessage);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.onEndHandler?.();
    };
  }

  startListening(config: VoiceSearchConfig = {}): void {
    if (!this.recognition || this.isListening) return;

    this.recognition.continuous = config.continuous ?? false;
    this.recognition.interimResults = config.interimResults ?? true;
    this.recognition.lang = config.language ?? 'en-US';
    this.recognition.maxAlternatives = config.maxAlternatives ?? 1;

    try {
      this.recognition.start();
    } catch (error) {
      this.onErrorHandler?.('Failed to start speech recognition.');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  onRecognitionStart(handler: VoiceSearchEventCallback): void {
    this.onStartHandler = handler;
  }

  onRecognitionResult(handler: VoiceSearchEventHandler): void {
    this.onResultHandler = handler;
  }

  onRecognitionError(handler: VoiceSearchErrorHandler): void {
    this.onErrorHandler = handler;
  }

  onRecognitionEnd(handler: VoiceSearchEventCallback): void {
    this.onEndHandler = handler;
  }

  getIsListening(): boolean {
    return this.isListening;
  }
}

// Export singleton instance
export const voiceSearchService = new VoiceSearchService();

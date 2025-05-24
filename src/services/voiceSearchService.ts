
/**
 * Voice Search Service for handling speech recognition
 */

export interface VoiceSearchResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface VoiceSearchConfig {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export class VoiceSearchService {
  private recognition: any = null;
  private isListening = false;
  private onResult: ((result: VoiceSearchResult) => void) | null = null;
  private onError: ((error: string) => void) | null = null;
  private onStart: (() => void) | null = null;
  private onEnd: (() => void) | null = null;

  constructor() {
    this.initializeRecognition();
  }

  private initializeRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
    }
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  startListening(config: VoiceSearchConfig = {}) {
    if (!this.isSupported()) {
      this.onError?.('Speech recognition is not supported in this browser');
      return;
    }

    if (this.isListening) {
      return;
    }

    // Configure recognition
    this.recognition.continuous = config.continuous ?? false;
    this.recognition.interimResults = config.interimResults ?? true;
    this.recognition.lang = config.language ?? 'en-US';
    this.recognition.maxAlternatives = config.maxAlternatives ?? 1;

    // Event handlers
    this.recognition.onstart = () => {
      this.isListening = true;
      this.onStart?.();
    };

    this.recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        
        this.onResult?.({
          transcript,
          confidence,
          isFinal: result.isFinal
        });
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      let errorMessage = 'Speech recognition error';
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'Audio capture failed. Please check your microphone.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please enable microphone permissions.';
          break;
        case 'network':
          errorMessage = 'Network error occurred during speech recognition.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      this.onError?.(errorMessage);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.onEnd?.();
    };

    try {
      this.recognition.start();
    } catch (error) {
      this.isListening = false;
      this.onError?.('Failed to start speech recognition');
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  onRecognitionResult(callback: (result: VoiceSearchResult) => void) {
    this.onResult = callback;
  }

  onRecognitionError(callback: (error: string) => void) {
    this.onError = callback;
  }

  onRecognitionStart(callback: () => void) {
    this.onStart = callback;
  }

  onRecognitionEnd(callback: () => void) {
    this.onEnd = callback;
  }

  getListeningState(): boolean {
    return this.isListening;
  }
}

export const voiceSearchService = new VoiceSearchService();


export interface VoiceSearchOptions {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
}

export interface VoiceSearchResult {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

class VoiceSearchService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
    }
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  startListening(options: VoiceSearchOptions = {}): void {
    if (!this.recognition || this.isListening) return;

    this.recognition.continuous = options.continuous || false;
    this.recognition.interimResults = options.interimResults || true;
    this.recognition.lang = options.language || 'en-US';

    this.isListening = true;
    this.recognition.start();
  }

  stopListening(): void {
    if (!this.recognition || !this.isListening) return;
    
    this.isListening = false;
    this.recognition.stop();
  }

  onRecognitionResult(callback: (result: VoiceSearchResult) => void): void {
    if (!this.recognition) return;

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      callback({
        transcript: result[0].transcript,
        isFinal: result.isFinal,
        confidence: result[0].confidence
      });
    };
  }

  onRecognitionStart(callback: () => void): void {
    if (!this.recognition) return;
    this.recognition.onstart = callback;
  }

  onRecognitionEnd(callback: () => void): void {
    if (!this.recognition) return;
    this.recognition.onend = () => {
      this.isListening = false;
      callback();
    };
  }

  onRecognitionError(callback: (error: SpeechRecognitionErrorEvent) => void): void {
    if (!this.recognition) return;
    this.recognition.onerror = (error) => {
      this.isListening = false;
      callback(error);
    };
  }
}

export const voiceSearchService = new VoiceSearchService();

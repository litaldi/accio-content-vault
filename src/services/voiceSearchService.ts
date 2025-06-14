
class VoiceSearchService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;

  constructor() {
    if (this.isSupported()) {
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionConstructor();
      this.setupRecognition();
    }
  }

  isSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
  }

  startListening(options: {
    continuous?: boolean;
    interimResults?: boolean;
    language?: string;
  } = {}) {
    if (!this.recognition || this.isListening) return;

    this.recognition.continuous = options.continuous ?? false;
    this.recognition.interimResults = options.interimResults ?? true;
    this.recognition.lang = options.language ?? 'en-US';

    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    if (!this.recognition || !this.isListening) return;

    this.isListening = false;
    this.recognition.stop();
  }

  onRecognitionStart(callback: () => void) {
    if (!this.recognition) return;
    this.recognition.onstart = callback;
  }

  onRecognitionEnd(callback: () => void) {
    if (!this.recognition) return;
    this.recognition.onend = callback;
  }

  onRecognitionResult(callback: (result: { transcript: string; isFinal: boolean }) => void) {
    if (!this.recognition) return;
    
    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      callback({
        transcript: result[0].transcript,
        isFinal: result.isFinal
      });
    };
  }

  onRecognitionError(callback: () => void) {
    if (!this.recognition) return;
    this.recognition.onerror = callback;
  }

  getIsListening() {
    return this.isListening;
  }
}

export const voiceSearchService = new VoiceSearchService();

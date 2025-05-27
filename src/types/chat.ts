
export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface AssistantMessage extends ChatMessage {
  type: 'assistant';
  suggestions?: string[];
}

export interface UserMessage extends ChatMessage {
  type: 'user';
}

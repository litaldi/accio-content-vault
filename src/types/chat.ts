
export interface BaseMessage {
  id: string;
  content: string;
  timestamp: Date;
}

export interface UserMessage extends BaseMessage {
  type: 'user';
}

export interface AssistantMessage extends BaseMessage {
  type: 'assistant';
  suggestions?: string[];
}

export type ChatMessage = UserMessage | AssistantMessage;

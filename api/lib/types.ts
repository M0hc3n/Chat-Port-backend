export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  metadata?: any;
}

export interface FormatRequest {
  messages: ChatMessage[];
  options?: {
    provider?: string;
    temperature?: number;
    maxTokens?: number;
  };
}

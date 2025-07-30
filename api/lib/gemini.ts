import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "./types";

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async formatChat(messages: ChatMessage[]): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = this.createSystemPrompt(messages.length);
    const conversation = this.prepareConversation(messages);

    const prompt = `${systemPrompt}\n\n=== CONVERSATION START ===\n\n${conversation}\n\n=== CONVERSATION END ===`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  }

  private createSystemPrompt(messageCount: number): string {
    return `Format this ${messageCount}-message conversation into clean markdown that:
1. Preserves all important information
2. Removes redundant acknowledgments
3. Organizes with clear headers
4. Maintains code formatting
5. Is cross-platform compatible

Return ONLY formatted markdown.`;
  }

  private prepareConversation(messages: ChatMessage[]): string {
    return messages
      .map(
        (msg, index) => `Message ${index + 1} (${msg.role}):\n${msg.content}`
      )
      .join("\n\n---\n\n");
  }
}

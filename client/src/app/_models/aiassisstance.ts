import { AiPromptType } from "./aiPromtType";

export interface AiAssistance {
    userMessage: string;
    conversationContext: string;
    userContext: string;
    promtType: AiPromptType;
}
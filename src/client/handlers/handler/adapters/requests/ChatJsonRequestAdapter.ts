import type OpenAI from "openai";
import ChatRequestAdapter from "./ChatRequestAdapter.js";
import type { ChatModelSupport } from "../../../types/ChatTypes.js";

export default class ChatJsonRequestAdapter extends ChatRequestAdapter {
  constructor(
    model: Extract<Extract<ChatModelSupport["json"], OpenAI.ChatCompletionCreateParamsNonStreaming["model"]>, string>,
    seed: Extract<OpenAI.ChatCompletionCreateParamsNonStreaming["seed"], number>,
    temperature: Extract<OpenAI.ChatCompletionCreateParamsNonStreaming["temperature"], number>,
    prompt: string,
    jsonModeInstruction: string,
    additionalInstructions?: string,
    maxTokens?: Extract<OpenAI.ChatCompletionCreateParamsNonStreaming["max_tokens"], number>,
  ) {
    super(
      model,
      prompt,
      `${jsonModeInstruction} ${additionalInstructions ?? ""}`,
      temperature,
      maxTokens,
      seed,
    );
    this.payload.response_format = { type: "json_object" };
  }
}

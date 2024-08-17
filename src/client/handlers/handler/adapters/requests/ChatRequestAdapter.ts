import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type ChatRequestPayload = OpenAI.ChatCompletionCreateParamsNonStreaming;

export default class ChatRequestAdapter extends RequestAdapter<ChatRequestPayload> {
  public readonly payload: ChatRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<ChatRequestPayload["model"], string>,
    prompt: string,
    instructions?: string,
    temperature?: Extract<ChatRequestPayload["temperature"], number>,
    maxTokens?: Extract<ChatRequestPayload["max_tokens"], number>,
    seed?: Extract<ChatRequestPayload["seed"], number>,

  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      };

      if (instructions !== undefined && instructions !== "")
        this.payload.messages.push({
          role: "system",
          content: instructions,
        });

      if (temperature !== undefined)
        this.payload.temperature = temperature;

      if (maxTokens !== undefined)
        this.payload.max_tokens = maxTokens;

      if (seed !== undefined)
        this.payload.seed = seed;
    }
    catch (e) {
      throw new SyntaxError(
        `ChatRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

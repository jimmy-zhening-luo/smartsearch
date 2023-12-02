import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type ChatRequestPayload = OpenAI.ChatCompletionCreateParamsNonStreaming;

export default class ChatRequestAdapter
  extends RequestAdapter<ChatRequestPayload> {
  public readonly payload: ChatRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<ChatRequestPayload["model"], string>,
    userPrompt: string,
    systemPrompt?: string,
  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      };

      if (systemPrompt !== undefined && systemPrompt !== "")
        this.payload.messages.push({
          role: "system",
          content: systemPrompt,
        });
    }
    catch (e) {
      throw new SyntaxError(
        `ChatRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

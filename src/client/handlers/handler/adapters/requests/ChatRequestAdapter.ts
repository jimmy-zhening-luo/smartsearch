import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type ChatRequestPayload = OpenAI.ChatCompletionCreateParamsNonStreaming;

export default class ChatRequestAdapter
  extends RequestAdapter<ChatRequestPayload> {
  readonly payload: ChatRequestPayload;

  constructor(
    userPrompt: string,
    systemPrompt: string = "",
    model: Extract<ChatRequestPayload["model"], string> = "gpt-4",
  ) {
    try {
      super();
      this.payload = {
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
        model: model,
      };

      if (systemPrompt !== "")
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

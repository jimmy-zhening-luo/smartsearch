import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type ChatRequestPayload = OpenAI.ChatCompletionCreateParamsNonStreaming;

export default class ChatRequestAdapter extends RequestAdapter<ChatRequestPayload> {
  build(
    userPrompt: string,
    systemPrompt: string = "",
    model: string = "gpt-4",
  ): ChatRequestPayload {
    try {
      const payload: ChatRequestPayload = {
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
        model: model,
      };

      if (systemPrompt !== "")
        payload.messages.push({
          role: "system",
          content: systemPrompt,
        });

      return payload;
    } catch (e) {
      throw new SyntaxError(
        `ChatRequestAdapter: build: Error building payload`,
        {
          cause: e,
        },
      );
    }
  }
}

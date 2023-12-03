import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type ChatResponsePayload = OpenAI.ChatCompletion;
type UnpackedChatResponse = {
  answer: Extract<ChatResponsePayload["choices"][0]["message"]["content"], string>;
  model: Extract<ChatResponsePayload["model"], string>;
  exit: Extract<ChatResponsePayload["choices"][0]["finish_reason"], string>;
};

export default class ChatResponseAdapter
  extends ResponseAdapter<ChatResponsePayload, UnpackedChatResponse> {
  public readonly unpacked: UnpackedChatResponse;

  constructor(payload: ChatResponsePayload) {
    try {
      super(payload);
      if (
        this.payload.choices.length === 0
        || this.payload.choices[0] === undefined
      )
        throw new SyntaxError(
          `Unexpected: Native client returned a payload with 0 messages`,
        );
      else {
        this.unpacked = {
          answer: this.payload.choices[0].message.content ?? "",
          model: this.payload.model,
          exit: this.payload.choices[0].finish_reason,
        };
      }
    }
    catch (e) {
      throw new SyntaxError(
        `ChatResponseAdapter: ctor: Failed to instantiate concrete response adapter with unpacked payload`,
        { cause: e },
      );
    }
  }
}

import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type ChatResponsePayload = OpenAI.ChatCompletion;

type UnpackedChatResponse = {
  answer: string;
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
        throw new RangeError(
          `Unexpected: Native client returned a payload with 0 messages`,
        );
      else if (this.payload.choices[0].finish_reason === "content_filter")
        throw new OverconstrainedError(
          `OpenAI is being authoritarian and believes that your request is inappropriate - ironic, as they are masquerading their own abuse as 'prevention of abuse' while doing precisely nothing to actually prevent abuse.`,
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
      throw new EvalError(
        `ChatResponseAdapter: ctor: Failed to instantiate concrete response adapter with unpacked payload`,
        { cause: e },
      );
    }
  }
}

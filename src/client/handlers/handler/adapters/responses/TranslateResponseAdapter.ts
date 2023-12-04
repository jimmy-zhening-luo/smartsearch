import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type TranslateResponsePayload = OpenAI.Audio.Translation;
type UnpackedTranslateResponse = Extract<TranslateResponsePayload["text"], string>;

export default class TranslateResponseAdapter
  extends ResponseAdapter<
  TranslateResponsePayload,
  UnpackedTranslateResponse
  > {
  public readonly unpacked: UnpackedTranslateResponse;

  constructor(payload: TranslateResponsePayload) {
    try {
      super(payload);
      this.unpacked = this.payload.text;
    }
    catch (e) {
      throw new EvalError(
        `TranslateResponseAdapter: ctor: Failed to instantiate concrete response adapter with unpacked payload`,
        { cause: e },
      );
    }
  }
}

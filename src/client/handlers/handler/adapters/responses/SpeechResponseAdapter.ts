import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type SpeechResponsePayload = Awaited<ReturnType<OpenAI.Audio.Speech["create"]>>;
type UnpackedSpeechResponse = Extract<SpeechResponsePayload, Response>;

export default class SpeechResponseAdapter
  extends ResponseAdapter<
  SpeechResponsePayload,
  UnpackedSpeechResponse
  > {
  public readonly unpacked: UnpackedSpeechResponse;

  constructor(payload: SpeechResponsePayload) {
    try {
      super(payload);
      this.unpacked = this.payload;
    }
    catch (e) {
      throw new SyntaxError(
        `SpeechResponseAdapter: ctor: Failed to instantiate concrete response adapter with unpacked payload`,
        { cause: e },
      );
    }
  }
}

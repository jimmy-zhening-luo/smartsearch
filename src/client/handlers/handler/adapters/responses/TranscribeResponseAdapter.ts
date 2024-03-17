import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type TranscribeResponsePayload = OpenAI.Audio.Transcription;
type UnpackedTranscribeResponse = Extract<TranscribeResponsePayload["text"], string>;

export default class TranscribeResponseAdapter
  extends ResponseAdapter<
    TranscribeResponsePayload,
    UnpackedTranscribeResponse
  > {
  public readonly unpacked: UnpackedTranscribeResponse;

  constructor(payload: TranscribeResponsePayload) {
    try {
      super(payload);
      this.unpacked = this.payload.text;
    }
    catch (e) {
      throw new EvalError(
        `TranscribeResponseAdapter: ctor: Failed to instantiate concrete response adapter with unpacked payload`,
        { cause: e },
      );
    }
  }
}

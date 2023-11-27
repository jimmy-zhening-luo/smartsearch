import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type SpeechRequestPayload = OpenAI.Audio.SpeechCreateParams;

export default class SpeechRequestAdapter
  extends RequestAdapter<SpeechRequestPayload> {
  readonly payload: SpeechRequestPayload;

  constructor(
    model: Extract<SpeechRequestPayload["model"], string> = "tts-1-hd",
    voice: Extract<SpeechRequestPayload["voice"], string> = "alloy",
    input: string,
    speed?: number,
    response_format?: Extract<SpeechRequestPayload["response_format"], string>,
  ) {
    try {
      super();
      this.payload = {
        model,
        voice,
        input,
      };
      if (speed !== undefined)
        this.payload.speed = speed;
      if (response_format !== undefined)
        this.payload.response_format = response_format;
    }
    catch (e) {
      throw new SyntaxError(
        `SpeechRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

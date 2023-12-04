import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type SpeechRequestPayload = OpenAI.Audio.SpeechCreateParams;

export default class SpeechRequestAdapter
  extends RequestAdapter<SpeechRequestPayload> {
  public readonly payload: SpeechRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<SpeechRequestPayload["model"], string>,
    voice: Extract<SpeechRequestPayload["voice"], string>,
    input: string,
    speed?: number,
    outputType?: Extract<SpeechRequestPayload["response_format"], string>,
  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        voice,
        input,
      };
      if (speed !== undefined)
        this.payload.speed = speed;
      if (outputType !== undefined)
        this.payload.response_format = outputType;
    }
    catch (e) {
      throw new SyntaxError(
        `SpeechRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

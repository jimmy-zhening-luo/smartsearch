import type { LanguageCode } from "iso-639-1";
import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type TranscribeRequestPayload = OpenAI.Audio.TranscriptionCreateParams;

export default class TranscribeRequestAdapter
  extends RequestAdapter<TranscribeRequestPayload> {
  public readonly payload: TranscribeRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<TranscribeRequestPayload["model"], string>,
    file: Extract<File, TranscribeRequestPayload["file"]>,
    inputLanguage?: Extract<LanguageCode, string>,
    instructions?: string,
    outputType?: Extract<TranscribeRequestPayload["response_format"], string>,
  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        file,
      };
      if (inputLanguage !== undefined)
        this.payload.language = inputLanguage;
      if (instructions !== undefined)
        this.payload.prompt = instructions;
      if (outputType !== undefined)
        this.payload.response_format = outputType;
    }
    catch (e) {
      throw new SyntaxError(
        `TranscribeRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

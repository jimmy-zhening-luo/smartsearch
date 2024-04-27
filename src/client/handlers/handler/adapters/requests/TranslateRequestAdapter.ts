import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type TranslateRequestPayload = OpenAI.Audio.TranslationCreateParams;

export default class TranslateRequestAdapter
  extends RequestAdapter<TranslateRequestPayload> {
  public readonly payload: TranslateRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<TranslateRequestPayload["model"], string>,
    file: Extract<File, TranslateRequestPayload["file"]>,
    instructions?: string,
    outputType?: Extract<TranslateRequestPayload["response_format"], string>,
  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        file,
      };

      if (instructions !== undefined)
        this.payload.prompt = instructions;

      if (outputType !== undefined)
        this.payload.response_format = outputType;
    }
    catch (e) {
      throw new SyntaxError(
        `TranslateRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

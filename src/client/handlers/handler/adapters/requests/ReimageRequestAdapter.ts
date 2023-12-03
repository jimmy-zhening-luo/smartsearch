import type { ReadStream } from "fs";
import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";

type ReimageRequestPayload = OpenAI.Images.ImageEditParams;

export default class ReimageRequestAdapter
  extends RequestAdapter<ReimageRequestPayload> {
  public readonly payload: ReimageRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<ReimageRequestPayload["model"], string>,
    image: Extract<ReimageRequestPayload["image"], ReadStream>,
    prompt: string,
    size: Extract<ReimageRequestPayload["size"], string>,
    n?: 1,
    outputType?: Extract<ReimageRequestPayload["response_format"], string>,
  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        image,
        prompt,
        size,
      };

      if (n !== undefined)
        this.payload.n = n;
      if (outputType !== undefined)
        this.payload.response_format = outputType;
    }
    catch (e) {
      throw new SyntaxError(
        `ReimageRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

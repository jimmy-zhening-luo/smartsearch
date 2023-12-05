import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";
import type { ImageEditCount } from "../../../types/ImageEditTypes.js";

type ImageEditRequestPayload = OpenAI.Images.ImageEditParams;

export default class ImageEditRequestAdapter
  extends RequestAdapter<ImageEditRequestPayload> {
  public readonly payload: ImageEditRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<ImageEditRequestPayload["model"], string>,
    image: File,
    mask: File,
    prompt: string,
    size: Extract<ImageEditRequestPayload["size"], string>,
    n?: Extract<Extract<ImageEditCount, ImageEditRequestPayload["n"]>, number>,
    outputType?: Extract<ImageEditRequestPayload["response_format"], string>,
  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        image,
        mask,
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
        `ImageEditRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

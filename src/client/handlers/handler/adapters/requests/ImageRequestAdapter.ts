import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";
import type { ImageCount } from "../../../types/ImageTypes.js";

type ImageRequestPayload = OpenAI.Images.ImageGenerateParams;

export default class ImageRequestAdapter
  extends RequestAdapter<ImageRequestPayload> {
  public readonly payload: ImageRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<ImageRequestPayload["model"], string>,
    prompt: string,
    quality: Extract<ImageRequestPayload["quality"], string>,
    size: Extract<ImageRequestPayload["size"], string>,
    style?: Extract<ImageRequestPayload["style"], string>,
    n?: Extract<Extract<ImageCount, ImageRequestPayload["n"]>, number>,
    outputType?: Extract<ImageRequestPayload["response_format"], string>,
  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        prompt,
        quality,
        size,
      };

      if (style !== undefined)
        this.payload.style = style;

      if (n !== undefined)
        this.payload.n = n;

      if (outputType !== undefined)
        this.payload.response_format = outputType;
    }
    catch (e) {
      throw new SyntaxError(
        `ImageRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

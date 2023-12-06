import type OpenAI from "openai";
import RequestAdapter from "./request/RequestAdapter.js";
import type { ImageVariationCount } from "../../../types/ImageVariationTypes.js";

type ImageVariationRequestPayload = OpenAI.Images.ImageCreateVariationParams;

export default class ImageVariationRequestAdapter
  extends RequestAdapter<ImageVariationRequestPayload> {
  public readonly payload: ImageVariationRequestPayload;
  public readonly clientOptions: null;

  constructor(
    model: Extract<ImageVariationRequestPayload["model"], string>,
    image: Extract<File, ImageVariationRequestPayload["image"]>,
    size: Extract<ImageVariationRequestPayload["size"], string>,
    n?: Extract<Extract<ImageVariationCount, ImageVariationRequestPayload["n"]>, number>,
    outputType?: Extract<ImageVariationRequestPayload["response_format"], string>,
  ) {
    try {
      super();
      this.clientOptions = null;
      this.payload = {
        model,
        image,
        size,
      };

      if (n !== undefined)
        this.payload.n = n;
      if (outputType !== undefined)
        this.payload.response_format = outputType;
    }
    catch (e) {
      throw new SyntaxError(
        `ImageVariationRequestAdapter: ctor: Failed to build request payload from inputs`,
        { cause: e },
      );
    }
  }
}

import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type ImageResponsePayload = OpenAI.Images.ImagesResponse;
type UnpackedImageResponse = {
  images: Array<Extract<Extract<ImageResponsePayload["data"][0]["b64_json"], ImageResponsePayload["data"][0]["url"]>, string>>;
  prompts: Map<Extract<Extract<ImageResponsePayload["data"][0]["b64_json"], ImageResponsePayload["data"][0]["url"]>, string>, string>;
};

export default class ImageResponseAdapter
  extends ResponseAdapter<ImageResponsePayload, UnpackedImageResponse> {
  public readonly unpacked: UnpackedImageResponse;

  constructor(payload: ImageResponsePayload) {
    try {
      super(payload);
      this.unpacked = {
        images: [],
        prompts: new Map(),
      };

      const nonEmptyImages: typeof payload.data = payload.data.filter(
        (image: OpenAI.Images.Image): boolean =>
          (image.b64_json ?? image.url ?? "") !== "",
      );

      for (const image of nonEmptyImages) {
        const urlOrData = image.b64_json ?? image.url ?? "";
        const editedPrompt = image.revised_prompt;

        this.unpacked.images.push(urlOrData);

        if (editedPrompt !== undefined)
          this.unpacked
            .prompts
            .set(
              urlOrData,
              editedPrompt,
            );
      }
    }
    catch (e) {
      throw new EvalError(
        `ImageResponseAdapter: ctor: Failed to instantiate concrete response adapter with unpacked payload`,
        { cause: e },
      );
    }
  }
}

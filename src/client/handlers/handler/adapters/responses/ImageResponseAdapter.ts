import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type ImageResponsePayload = OpenAI.Images.ImagesResponse;
type UnpackedImageResponse = Array<{
  urlOrData: Extract<Extract<ImageResponsePayload["data"][0]["b64_json"], ImageResponsePayload["data"][0]["url"]>, string>;
  editedPrompt?: Extract<ImageResponsePayload["data"][0]["revised_prompt"], string>;
}>;

export default class ImageResponseAdapter
  extends ResponseAdapter<ImageResponsePayload, UnpackedImageResponse> {
  public readonly unpacked: UnpackedImageResponse;

  constructor(payload: ImageResponsePayload) {
    try {
      super(payload);

      this.unpacked = [];

      for (const image of payload.data) {
        const urlOrData = image.b64_json ?? image.url ?? "";
        const editedPrompt = image.revised_prompt;

        this.unpacked.push(
          editedPrompt === undefined
            ? { urlOrData }
            : {
                urlOrData,
                editedPrompt,
              },
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

import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type ModelsResponsePayload = OpenAI.Models.ModelsPage;
type UnpackedModelsResponse = Array<Extract<ModelsResponsePayload["data"][0]["id"], string>>;

export default class ModelsResponseAdapter
  extends ResponseAdapter<ModelsResponsePayload, UnpackedModelsResponse> {
  public readonly unpacked: UnpackedModelsResponse;

  constructor(payload: ModelsResponsePayload) {
    try {
      super(payload);
      if (this.payload.data.length === 0)
        throw new EvalError(
          `Unexpected: native client returned a payload with 0 models`,
        );
      else {
        this.unpacked = this.payload.data.map(model => model.id);
      }
    }
    catch (e) {
      throw new EvalError(
        `ModelsResponseAdapter: ctor: Failed to build instantiate response adapter with unpacked payload`,
        { cause: e },
      );
    }
  }
}

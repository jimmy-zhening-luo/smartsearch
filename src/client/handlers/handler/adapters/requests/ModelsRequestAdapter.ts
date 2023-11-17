import RequestAdapter from "./request/RequestAdapter.js";

type ModelsRequestPayload = null;

export default class ModelsRequestAdapter extends RequestAdapter<ModelsRequestPayload> {
  build(): ModelsRequestPayload {
    try {
      return null;
    } catch (e) {
      throw new SyntaxError(
        `ModelsRequestAdapter: build: Error building payload`,
        {
          cause: e,
        },
      );
    }
  }
}

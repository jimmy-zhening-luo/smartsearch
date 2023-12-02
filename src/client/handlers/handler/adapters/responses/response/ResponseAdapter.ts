import type IAdapter from "../../adapter/IAdapter.js";

export default abstract class ResponseAdapter<ResponsePayload, UnpackedResponse>
implements IAdapter<ResponsePayload> {
  public readonly payload: ResponsePayload;
  public abstract readonly unpacked: UnpackedResponse;

  constructor(payload: ResponsePayload) {
    try {
      this.payload = payload;
    }
    catch (e) {
      throw new SyntaxError(
        `ResponseAdapter: ctor: Failed to instantiate abstract base response adapter by setting member payload to a native client response payload`,
        { cause: e },
      );
    }
  }
}

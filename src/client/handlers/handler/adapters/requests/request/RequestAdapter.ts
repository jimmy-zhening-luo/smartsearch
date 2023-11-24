import type IAdapter from "../../adapter/IAdapter.js";

export default abstract class RequestAdapter<RequestPayload>
implements IAdapter<RequestPayload> {
  abstract readonly payload: RequestPayload;
}

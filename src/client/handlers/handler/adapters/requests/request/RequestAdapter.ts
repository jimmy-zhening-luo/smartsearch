import type { IAdapter } from "../../adapter/IAdapter.js";

export default abstract class RequestAdapter<
  RequestPayload,
  ClientOptions = null,
>
implements IAdapter<RequestPayload> {
  public abstract readonly payload: RequestPayload;
  public abstract readonly clientOptions: ClientOptions;
}

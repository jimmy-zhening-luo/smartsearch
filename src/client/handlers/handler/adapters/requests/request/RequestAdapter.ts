import type { IAdapter } from "../../adapter/IAdapter.js";

export default abstract class RequestAdapter<
  RequestPayload,
  ClientOptions = null,
>
implements IAdapter<RequestPayload> {
  public abstract readonly payload: ClientOptions extends null ? RequestPayload : RequestPayload;
  public abstract readonly clientOptions: ClientOptions;
}

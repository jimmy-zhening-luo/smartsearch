import type OpenAI from "openai";
import RequestAdapter from "./adapters/requests/request/RequestAdapter.js";
import ResponseAdapter from "./adapters/responses/response/ResponseAdapter.js";

export default abstract class Handler<
  Req extends RequestAdapter<Req["payload"]>,
  ReqCtor extends new (
    ...args: ConstructorParameters<ReqCtor>
  ) => Req,
  Res extends ResponseAdapter<Res["payload"], Res["unpacked"]>,
  ResCtor extends new (
    payload: Res["payload"]
  ) => Res,
  Defaults extends undefined | Required<Record<string, string>>,
> {
  protected readonly requestAdapterCtor: ReqCtor;
  protected readonly responseAdapterCtor: ResCtor;
  protected readonly client: OpenAI;
  protected readonly defaults: Defaults;

  constructor(
    requestConstructor: ReqCtor,
    responseConstructor: ResCtor,
    client: OpenAI,
    defaults: Defaults,
  ) {
    try {
      this.requestAdapterCtor = requestConstructor;
      this.responseAdapterCtor = responseConstructor;
      this.client = client;
      this.defaults = defaults;
    }
    catch (e) {
      throw new EvalError(
        `Handler: ctor: Failed to instantiate abstract base handler by setting client and ctors`,
        { cause: e },
      );
    }
  }

  protected abstract requestInterface(
    ...requestInputs: unknown[]
  ): ConstructorParameters<ReqCtor>;

  protected abstract handle(
    requestPayload: Req["payload"]
  ): Promise<Res["payload"]>;

  protected after?(
    requestAdapter: Req,
    unpacked: Res["unpacked"]
  ): Res["unpacked"];

  async submit(
    ...requestInputs: Parameters<typeof Handler.prototype.requestInterface>
  ): Promise<Res["unpacked"]> {
    try {
      const requestAdapter: Req = new this.requestAdapterCtor(
        ...this.requestInterface(...requestInputs),
      );

      return this.handle(
        requestAdapter.payload,
      )
        .then(
          responsePayload =>
            new this.responseAdapterCtor(responsePayload).unpacked,
          e =>
            new EvalError(
              `Failed to unpack the returned response payload`,
              { cause: e },
            ),
        )
        .then(
          unpacked =>
            this.after?.(requestAdapter, unpacked) ?? unpacked,
          e =>
            new EvalError(
              `Failed to postprocess unpacked response using after()`,
              { cause: e },
            ),
        )
        .catch(
          failure =>
            new EvalError(
              `Promise rejected`,
              { cause: failure },
            ),
        );
    }
    catch (e) {
      throw new EvalError(
        `Handler: submit: Failed to submit request payload by calling this.handle()`,
        { cause: e },
      );
    }
  }
}

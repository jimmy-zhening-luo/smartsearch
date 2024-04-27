import type OpenAI from "openai";
import type RequestAdapter from "./adapters/requests/request/RequestAdapter.js";
import type ResponseAdapter from "./adapters/responses/response/ResponseAdapter.js";

export default abstract class Handler<
  Req extends RequestAdapter<Req["payload"], Req["clientOptions"]>,
  ReqCtor extends new (
    ...args: ConstructorParameters<ReqCtor>
  )=> Req,
  Res extends ResponseAdapter<Res["payload"], Res["unpacked"]>,
  ResCtor extends new (
    payload: Res["payload"]
  )=> Res,
  ReqInterface extends unknown[] = [],
  ReqInterfaceDefaults extends Required<Record<string, unknown>> | null = null,
> {
  protected readonly requestAdapterCtor: ReqCtor;
  protected readonly responseAdapterCtor: ResCtor;
  protected readonly client: OpenAI;
  protected readonly requestInterfaceDefaults: ReqInterfaceDefaults;

  constructor(
    requestConstructor: ReqCtor,
    responseConstructor: ResCtor,
    client: OpenAI,
    defaults: ReqInterfaceDefaults,
  ) {
    try {
      this.requestAdapterCtor = requestConstructor;
      this.responseAdapterCtor = responseConstructor;
      this.client = client;
      this.requestInterfaceDefaults = defaults;
    }
    catch (e) {
      throw new EvalError(
        `Handler: ctor: Failed to instantiate abstract base handler by setting client and ctors`,
        { cause: e },
      );
    }
  }

  public async submit(
    ...requestInputs: Parameters<Handler<Req, ReqCtor, Res, ResCtor, ReqInterface, ReqInterfaceDefaults>["requestInterface"]>
  ): Promise<ReturnType<Handler<Req, ReqCtor, Res, ResCtor, ReqInterface, ReqInterfaceDefaults>["unpack"]>> {
    try {
      const requestAdapter: Req = new this.requestAdapterCtor(
        ...this.requestInterface(...requestInputs),
      );

      return await this.handle(
        requestAdapter.payload,
      )
        .then(
          responsePayload =>
            this.unpack(responsePayload),
        )
        .then(
          unpacked =>
            this.after?.(
              unpacked,
              requestAdapter.clientOptions,
            ) ?? unpacked,
        )
        .catch(
          rejection => {
            throw new EvalError(
              `Promise rejected`,
              { cause: rejection },
            );
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `Handler: submit: Failed to submit request payload by calling this.handle()`,
        { cause: e },
      );
    }
  }

  protected unpack(
    responsePayload: Res["payload"],
  ): Res["unpacked"] {
    try {
      return new this.responseAdapterCtor(responsePayload).unpacked;
    }
    catch (e) {
      throw new EvalError(
        `Handler: unpack: Failed to unpack the returned response payload`,
        { cause: e },
      );
    }
  }

  protected abstract requestInterface(
    ...requestInputs: ReqInterface
  ): ConstructorParameters<ReqCtor>;

  protected abstract handle(
    requestPayload: Req["payload"]
  ): Promise<Res["payload"]>;

  protected after?(
    unpacked: Res["unpacked"],
    clientOptions?: Req["clientOptions"],
  ): Res["unpacked"];
}

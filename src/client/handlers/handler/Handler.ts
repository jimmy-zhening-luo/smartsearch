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
> {
  // Functional
  protected readonly client: OpenAI;
  // Factories
  readonly requestAdapterCtor: ReqCtor;
  protected readonly responseAdapterCtor: ResCtor;
  // Instances
  protected readonly requestAdapter: Req;

  constructor(
    requestConstructor: ReqCtor,
    responseConstructor: ResCtor,
    client: OpenAI,
    ...requestInputs: ConstructorParameters<ReqCtor>
  ) {
    try {
      this.client = client;
      this.requestAdapterCtor = requestConstructor;
      this.responseAdapterCtor = responseConstructor;
      this.requestAdapter = new this.requestAdapterCtor(...requestInputs);
    }
    catch (e) {
      throw new EvalError(
        `Handler: ctor: Failed to instantiate abstract base handler by setting client, built request, and response constructor`,
        { cause: e },
      );
    }
  }

  protected abstract handle(
    requestPayload: Req["payload"]
  ): Promise<Res["payload"]>;

  protected after?(unpacked: Res["unpacked"]): Res["unpacked"];

  async submit(): Promise<Res["unpacked"]> {
    try {
      return this.handle(
        this.requestAdapter.payload,
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
            this.after?.(unpacked) ?? unpacked,
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

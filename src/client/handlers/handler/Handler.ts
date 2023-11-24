import type OpenAI from "openai";
import RequestAdapter from "./adapters/requests/request/RequestAdapter.js";
import ResponseAdapter from "./adapters/responses/response/ResponseAdapter.js";

export default abstract class Handler<
  Req extends RequestAdapter<Req["payload"]>,
  ReqConstructor extends new (
    ...args: ConstructorParameters<ReqConstructor>
  ) => Req,
  Res extends ResponseAdapter<Res["payload"], Res["unpacked"]>,
  ResConstructor extends new (
    payload: Res["payload"]
  ) => Res,
> {
  protected readonly client: OpenAI;
  readonly reqCtor: ReqConstructor;
  protected readonly resCtor: ResConstructor;
  protected readonly request: Req;

  constructor(
    requestConstructor: ReqConstructor,
    responseConstructor: ResConstructor,
    client: OpenAI,
    ...inputs: ConstructorParameters<ReqConstructor>
  ) {
    try {
      this.client = client;
      this.reqCtor = requestConstructor;
      this.resCtor = responseConstructor;
      this.request = new this.reqCtor(...inputs);
    }
    catch (e) {
      throw new EvalError(
        `Handler: ctor: Failed to instantiate abstract base handler by setting client, built request, and response constructor`,
        { cause: e },
      );
    }
  }

  async submit(): Promise<Res["unpacked"]> {
    try {
      return this.handle(
        this.request.payload,
      )
        .then(
          responsePayload => new this.resCtor(responsePayload).unpacked,
        );
    }
    catch (e) {
      throw new EvalError(
        `Handler: submit: Failed to submit request payload by calling this.handle()`,
        { cause: e },
      );
    }
  }

  abstract handle(
    requestPayload: Req["payload"]
  ): Promise<Res["payload"]>;
}

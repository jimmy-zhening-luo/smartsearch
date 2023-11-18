import type OpenAI from "openai";
import type RequestAdapter from "./adapters/requests/request/RequestAdapter.js";
import type ResponseAdapter from "./adapters/responses/response/ResponseAdapter.js";

export default abstract class Handler<
  Req extends RequestAdapter<Req["payload"]>,
  Res extends ResponseAdapter<Res["payload"], Res["output"]>,
> {
  protected readonly client: OpenAI;
  protected readonly request: Req;

  constructor(client: OpenAI, ...inputs: Parameters<Handler<Req, Res>["build"]>) {
    try {
      this.client = client;
    }
    catch (e) {
      throw new EvalError(
        `Handler: ctor: Error setting 'client' property from ctor input`,
        {
          cause: e,
        },
      );
    }

    try {
      this.request = this.build(...inputs);
    }
    catch (e) {
      throw new EvalError(
        `Handler: ctor: Error building 'request' property from ctor inputs`,
        {
          cause: e,
        },
      );
    }
  }

  async submit(): Promise<Res["output"]> {
    try {
      return this
        .handle(this.request.payload)
        .then(response => this.parse(response).output);
    }
    catch (e) {
      throw new EvalError(
        `Handler: submit: Error submitting request payload and parsing response payload`,
        {
          cause: e,
        },
      );
    }
  }

  abstract build(...inputs: Parameters<Req["build"]>): Req;

  abstract handle(requestPayload: Req["payload"]): Promise<Res["payload"]>;

  abstract parse(responsePayload: Res["payload"]): Res;
}

import Adapter from "../../adapter/Adapter.js";

export default abstract class RequestAdapter< RequestPayload>
  extends Adapter<RequestPayload> {
  readonly payload: RequestPayload;

  constructor(...inputs: Parameters<RequestAdapter<RequestPayload>["build"]>) {
    try {
      try {
        super();
      }
      catch (e) {
        throw new EvalError(
          `RequestAdapter: ctor: Error calling parent ctor`,
          {
            cause: e,
          },
        );
      }

      try {
        this.payload = this.build(...inputs);
      }
      catch (e) {
        throw new EvalError(
          `RequestAdapter: ctor: Error building payload`,
          {
            cause: e,
          },
        );
      }
    }
    catch (e) {
      throw new EvalError(
        `RequestAdapter: ctor: Error constructing RequestAdapter instance`,
        {
          cause: e,
        },
      );
    }
  }

  abstract build(...inputs: unknown[]): RequestPayload;
}

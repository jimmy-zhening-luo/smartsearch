import Adapter from "../../adapter/Adapter.js";

export default abstract class ResponseAdapter< ResponsePayload, ResponseOutput>
  extends Adapter<ResponsePayload> {
  readonly payload: ResponsePayload;
  readonly output: ResponseOutput;

  constructor(payload: ResponsePayload) {
    try {
      try {
        super();
      }
      catch (e) {
        throw new EvalError(
          `ResponseAdapter: ctor: Error calling parent ctor`,
          {
            cause: e,
          },
        );
      }

      try {
        this.payload = payload;
      }
      catch (e) {
        throw new EvalError(
          `ResponseAdapter: ctor: Error setting payload from ctor input`,
          {
            cause: e,
          },
        );
      }

      try {
        this.output = this.parse(this.payload);
      }
      catch (e) {
        throw new EvalError(
          `ResponseAdapter: ctor: Error parsing output from payload`,
          {
            cause: e,
          },
        );
      }
    }
    catch (e) {
      throw new EvalError(
        `ResponseAdapter: ctor: Error constructing ResponseAdapter instance`,
        {
          cause: e,
        },
      );
    }
  }

  abstract parse(payload: ResponsePayload): ResponseOutput;
}

import Handler from "./handler/Handler.js";
import ReimageRequestAdapter from "./handler/adapters/requests/ReimageRequestAdapter.js";
import ReimageResponseAdapter from "./handler/adapters/responses/ReimageResponseAdapter.js";
import type { ReimageCount } from "./types/ReimageTypes.js";

export default class ReimageHandler extends Handler<
ReimageRequestAdapter,
typeof ReimageRequestAdapter,
ReimageResponseAdapter,
typeof ReimageResponseAdapter,
[
  image: File,
  prompt: string,
  count?: Extract<Extract<ReimageCount, ReimageRequestAdapter["payload"]["n"]>, number>,
  dimensions?: Extract<ReimageRequestAdapter["payload"]["size"], string>,
  outputType?: Extract<ReimageRequestAdapter["payload"]["response_format"], string>,
],
{
  model: Extract<ReimageRequestAdapter["payload"]["model"], string>;
  count: Extract<Extract<ReimageCount, ReimageRequestAdapter["payload"]["n"]>, number>;
  dimensions: Extract<ReimageRequestAdapter["payload"]["size"], string>;
  outputType: Extract<ReimageRequestAdapter["payload"]["response_format"], string>;
}
> {
  constructor(
    client: typeof ReimageHandler.prototype.client,
    defaults: typeof ReimageHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        ReimageRequestAdapter,
        ReimageResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `ReimageHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    image: File,
    prompt: string,
    count?: Extract<Extract<ReimageCount, ReimageRequestAdapter["payload"]["n"]>, number>,
    dimensions?: Extract<ReimageRequestAdapter["payload"]["size"], string>,
    outputType?: Extract<ReimageRequestAdapter["payload"]["response_format"], string>,
  ): ConstructorParameters<typeof ReimageRequestAdapter> {
    try {
      return [
        this.requestInterfaceDefaults.model,
        image,
        prompt,
        dimensions ?? this.requestInterfaceDefaults.dimensions,
        count ?? this.requestInterfaceDefaults.count,
        outputType ?? this.requestInterfaceDefaults.outputType,
      ];
    }
    catch (e) {
      throw new EvalError(
        `ReimageHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: ReimageRequestAdapter["payload"],
  ): Promise<ReimageResponseAdapter["payload"]> {
    try {
      return await this.client.images.edit(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `ReimageHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

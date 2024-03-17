import Handler from "./handler/Handler.js";
import ModelsRequestAdapter from "./handler/adapters/requests/ModelsRequestAdapter.js";
import ModelsResponseAdapter from "./handler/adapters/responses/ModelsResponseAdapter.js";

export default class ModelsHandler extends Handler<
  ModelsRequestAdapter,
typeof ModelsRequestAdapter,
ModelsResponseAdapter,
typeof ModelsResponseAdapter,
[
  filter?: string,
]
> {
  constructor(
    client: typeof ModelsHandler.prototype.client,
    defaults: typeof ModelsHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        ModelsRequestAdapter,
        ModelsResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `ModelsHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(filter: string = ""): ConstructorParameters<typeof ModelsRequestAdapter> {
    try {
      return [filter];
    }
    catch (e) {
      throw new EvalError(
        `ModelsHandler: requestInterface: Failed to pass through request inputs`,
        { cause: e },
      );
    }
  }

  protected async handle(): Promise<ModelsResponseAdapter["payload"]> {
    try {
      return await this.client.models.list();
    }
    catch (e) {
      throw new EvalError(
        `ModelsHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }

  protected override after(
    unpacked: ModelsResponseAdapter["unpacked"],
    clientOptions: ModelsRequestAdapter["clientOptions"],
  ): ModelsResponseAdapter["unpacked"] {
    try {
      return unpacked
        .sort()
        .filter(
          model => model.includes(clientOptions.filter),
        );
    }
    catch (e) {
      throw new EvalError(
        `ModelsHandler: after: Failed to unpack the returned response payload`,
        { cause: e },
      );
    }
  }
}

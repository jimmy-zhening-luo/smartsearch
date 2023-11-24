import Handler from "./handler/Handler.js";
import ModelsRequestAdapter from "./handler/adapters/requests/ModelsRequestAdapter.js";
import ModelsResponseAdapter from "./handler/adapters/responses/ModelsResponseAdapter.js";

export default class ModelsHandler extends Handler<
ModelsRequestAdapter,
typeof ModelsRequestAdapter,
ModelsResponseAdapter,
typeof ModelsResponseAdapter
> {
  constructor(
    client: typeof ModelsHandler.prototype.client,
    ...inputs: ConstructorParameters<typeof ModelsRequestAdapter>
  ) {
    try {
      super(
        ModelsRequestAdapter,
        ModelsResponseAdapter,
        client,
        ...inputs,
      );
    }
    catch (e) {
      throw new EvalError(
        `ModelsHandler: ctor: Failed to instantiate concrete handler by calling abstract parent handler ctor with passthrough params and ctors for req & res adapters`,
        { cause: e },
      );
    }
  }

  protected override after(unpacked: ModelsResponseAdapter["unpacked"]): ModelsResponseAdapter["unpacked"] {
    try {
      return unpacked
        .sort()
        .filter(
          model => model.includes(this.requestAdapter.filterString),
        );
    }
    catch (e) {
      throw new EvalError(
        `ModelsHandler: after: Failed to unpack the returned response payload`,
        { cause: e },
      );
    }
  }

  protected async handle(): Promise<ModelsResponseAdapter["payload"]> {
    try {
      return this.client.models.list();
    }
    catch (e) {
      throw new EvalError(
        `ModelsHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

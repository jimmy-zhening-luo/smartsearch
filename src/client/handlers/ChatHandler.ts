import Handler from "./handler/Handler.js";
import ChatRequestAdapter from "./handler/adapters/requests/ChatRequestAdapter.js";
import ChatResponseAdapter from "./handler/adapters/responses/ChatResponseAdapter.js";

export default class ChatHandler extends Handler<
ChatRequestAdapter,
typeof ChatRequestAdapter,
ChatResponseAdapter,
typeof ChatResponseAdapter
> {
  constructor(
    client: typeof ChatHandler.prototype.client,
    ...inputs: ConstructorParameters<typeof ChatRequestAdapter>
  ) {
    try {
      super(
        ChatRequestAdapter,
        ChatResponseAdapter,
        client,
        ...inputs,
      );
    }
    catch (e) {
      throw new EvalError(
        `ChatHandler: ctor: Failed to instantiate concrete handler by calling abstract parent handler ctor with passthrough params and ctors for req & res adapters`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: ChatRequestAdapter["payload"],
  ): Promise<ChatResponseAdapter["payload"]> {
    try {
      return this.client.chat.completions.create(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `ChatHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

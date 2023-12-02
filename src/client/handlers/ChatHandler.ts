import Handler from "./handler/Handler.js";
import ChatRequestAdapter from "./handler/adapters/requests/ChatRequestAdapter.js";
import ChatResponseAdapter from "./handler/adapters/responses/ChatResponseAdapter.js";

export default class ChatHandler extends Handler<
ChatRequestAdapter,
typeof ChatRequestAdapter,
ChatResponseAdapter,
typeof ChatResponseAdapter,
[
  userPrompt: string,
  systemPrompt?: string,
  model?: Extract<ChatRequestAdapter["payload"]["model"], string>,
],
{
  model: Extract<ChatRequestAdapter["payload"]["model"], string>;
}
> {
  constructor(
    client: typeof ChatHandler.prototype.client,
    defaults: typeof ChatHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        ChatRequestAdapter,
        ChatResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `ChatHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    userPrompt: string,
    systemPrompt?: string,
    model: Extract<ChatRequestAdapter["payload"]["model"], string> = this.requestInterfaceDefaults.model,
  ): ConstructorParameters<typeof ChatRequestAdapter> {
    try {
      return [
        model,
        userPrompt,
        systemPrompt,
      ];
    }
    catch (e) {
      throw new EvalError(
        `ChatHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: ChatRequestAdapter["payload"],
  ): Promise<ChatResponseAdapter["payload"]> {
    try {
      return await this.client.chat.completions.create(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `ChatHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

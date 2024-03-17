import Handler from "./handler/Handler.js";
import ChatVisionRequestAdapter from "./handler/adapters/requests/ChatVisionRequestAdapter.js";
import ChatVisionResponseAdapter from "./handler/adapters/responses/ChatVisionResponseAdapter.js";
import type { ChatModelSupport } from "./types/ChatTypes.js";

export default class ChatVisionHandler extends Handler<
  ChatVisionRequestAdapter,
typeof ChatVisionRequestAdapter,
ChatVisionResponseAdapter,
typeof ChatVisionResponseAdapter,
[
  textPrompt: string,
  images: Array<Buffer | URL>,
  instructions?: string,
  temperature?: Extract<ChatVisionRequestAdapter["payload"]["temperature"], number>,
  maxTokens?: Extract<ChatVisionRequestAdapter["payload"]["max_tokens"], number>,
  model?: Extract<Extract<ChatModelSupport["vision"], ChatVisionRequestAdapter["payload"]["model"]>, string>,
  seed?: Extract<ChatVisionRequestAdapter["payload"]["seed"], number>,
],
{
  model: Extract<Extract<ChatModelSupport["vision"], ChatVisionRequestAdapter["payload"]["model"]>, string>;
  maxTokens: Extract<ChatVisionRequestAdapter["payload"]["max_tokens"], number>;
}
> {
  constructor(
    client: typeof ChatVisionHandler.prototype.client,
    defaults: typeof ChatVisionHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        ChatVisionRequestAdapter,
        ChatVisionResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `ChatVisionHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    textPrompt: string,
    images: Array<Buffer | URL>,
    instructions?: string,
    temperature?: Extract<ChatVisionRequestAdapter["payload"]["temperature"], number>,
    maxTokens?: Extract<ChatVisionRequestAdapter["payload"]["max_tokens"], number>,
    model?: Extract<Extract<ChatModelSupport["vision"], ChatVisionRequestAdapter["payload"]["model"]>, string>,
    seed?: Extract<ChatVisionRequestAdapter["payload"]["seed"], number>,
  ): ConstructorParameters<typeof ChatVisionRequestAdapter> {
    try {
      return [
        model ?? this.requestInterfaceDefaults.model,
        maxTokens ?? this.requestInterfaceDefaults.maxTokens,
        textPrompt,
        [...images],
        instructions,
        temperature,
        seed,
      ];
    }
    catch (e) {
      throw new EvalError(
        `ChatVisionHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: ChatVisionRequestAdapter["payload"],
  ): Promise<ChatVisionResponseAdapter["payload"]> {
    try {
      return await this.client.chat.completions.create(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `ChatVisionHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

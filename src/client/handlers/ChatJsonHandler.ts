import Handler from "./handler/Handler.js";
import ChatJsonRequestAdapter from "./handler/adapters/requests/ChatJsonRequestAdapter.js";
import ChatJsonResponseAdapter from "./handler/adapters/responses/ChatJsonResponseAdapter.js";
import type { ChatModelSupport } from "./types/ChatTypes.js";

export default class ChatJsonHandler extends Handler<
  ChatJsonRequestAdapter,
typeof ChatJsonRequestAdapter,
ChatJsonResponseAdapter,
typeof ChatJsonResponseAdapter,
[
  prompt: string,
  additionalInstructions?: string,
  temperature?: Extract<ChatJsonRequestAdapter["payload"]["temperature"], number>,
  maxTokens?: Extract<ChatJsonRequestAdapter["payload"]["max_tokens"], number>,
  model?: Extract<Extract<ChatModelSupport["json"], ChatJsonRequestAdapter["payload"]["model"]>, string>,
  seed?: Extract<ChatJsonRequestAdapter["payload"]["seed"], number>,
],
{
  model: Extract<Extract<ChatModelSupport["json"], ChatJsonRequestAdapter["payload"]["model"]>, string>;
  jsonInstruction: string;
  temperature: Extract<ChatJsonRequestAdapter["payload"]["temperature"], number>;
  seed: Extract<ChatJsonRequestAdapter["payload"]["seed"], number>;
}
> {
  constructor(
    client: typeof ChatJsonHandler.prototype.client,
    defaults: typeof ChatJsonHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        ChatJsonRequestAdapter,
        ChatJsonResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `ChatJsonHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    prompt: string,
    additionalInstructions?: string,
    temperature?: Extract<ChatJsonRequestAdapter["payload"]["temperature"], number>,
    maxTokens?: Extract<ChatJsonRequestAdapter["payload"]["max_tokens"], number>,
    model?: Extract<Extract<ChatModelSupport["json"], ChatJsonRequestAdapter["payload"]["model"]>, string>,
    seed?: Extract<ChatJsonRequestAdapter["payload"]["seed"], number>,
  ): ConstructorParameters<typeof ChatJsonRequestAdapter> {
    try {
      return [
        model ?? this.requestInterfaceDefaults.model,
        seed ?? this.requestInterfaceDefaults.seed,
        temperature ?? this.requestInterfaceDefaults.temperature,
        prompt,
        this.requestInterfaceDefaults.jsonInstruction,
        additionalInstructions,
        maxTokens,
      ];
    }
    catch (e) {
      throw new EvalError(
        `ChatJsonHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: ChatJsonRequestAdapter["payload"],
  ): Promise<ChatJsonResponseAdapter["payload"]> {
    try {
      return await this.client.chat.completions.create(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `ChatJsonHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

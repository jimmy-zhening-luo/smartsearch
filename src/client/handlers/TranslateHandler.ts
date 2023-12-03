import type { ReadStream } from "fs";
import Handler from "./handler/Handler.js";
import TranslateRequestAdapter from "./handler/adapters/requests/TranslateRequestAdapter.js";
import TranslateResponseAdapter from "./handler/adapters/responses/TranslateResponseAdapter.js";

export default class TranslateHandler extends Handler<
TranslateRequestAdapter,
typeof TranslateRequestAdapter,
TranslateResponseAdapter,
typeof TranslateResponseAdapter,
[
  file: ReadStream,
  instructions?: string,
  outputType?: Extract<TranslateRequestAdapter["payload"]["response_format"], string>,
  model?: Extract<TranslateRequestAdapter["payload"]["model"], string>,
],
{
  model: Extract<TranslateRequestAdapter["payload"]["model"], string>;
}
> {
  constructor(
    client: typeof TranslateHandler.prototype.client,
    defaults: typeof TranslateHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        TranslateRequestAdapter,
        TranslateResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `TranslateHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    file: ReadStream,
    instructions?: string,
    outputType?: Extract<TranslateRequestAdapter["payload"]["response_format"], string>,
    model: Extract<TranslateRequestAdapter["payload"]["model"], string> = this.requestInterfaceDefaults.model,
  ): ConstructorParameters<typeof TranslateRequestAdapter> {
    try {
      return [
        model,
        file,
        instructions,
        outputType,
      ];
    }
    catch (e) {
      throw new EvalError(
        `TranslateHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: TranslateRequestAdapter["payload"],
  ): Promise<TranslateResponseAdapter["payload"]> {
    try {
      return await this.client.audio.translations.create(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `TranslateHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

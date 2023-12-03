import type { ReadStream } from "fs";
import type { LanguageCode } from "iso-639-1";
import Handler from "./handler/Handler.js";
import TranscribeRequestAdapter from "./handler/adapters/requests/TranscribeRequestAdapter.js";
import TranscribeResponseAdapter from "./handler/adapters/responses/TranscribeResponseAdapter.js";

export default class TranscribeHandler extends Handler<
TranscribeRequestAdapter,
typeof TranscribeRequestAdapter,
TranscribeResponseAdapter,
typeof TranscribeResponseAdapter,
[
  file: ReadStream,
  inputLanguage?: Extract<LanguageCode, string>,
  instructions?: string,
  outputType?: Extract<TranscribeRequestAdapter["payload"]["response_format"], string>,
  model?: Extract<TranscribeRequestAdapter["payload"]["model"], string>,
],
{
  model: Extract<TranscribeRequestAdapter["payload"]["model"], string>;
}
> {
  constructor(
    client: typeof TranscribeHandler.prototype.client,
    defaults: typeof TranscribeHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        TranscribeRequestAdapter,
        TranscribeResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `TranscribeHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    file: ReadStream,
    inputLanguage?: Extract<LanguageCode, string>,
    instructions?: string,
    outputType?: Extract<TranscribeRequestAdapter["payload"]["response_format"], string>,
    model: Extract<TranscribeRequestAdapter["payload"]["model"], string> = this.requestInterfaceDefaults.model,
  ): ConstructorParameters<typeof TranscribeRequestAdapter> {
    try {
      return [
        model,
        file,
        inputLanguage,
        instructions,
        outputType,
      ];
    }
    catch (e) {
      throw new EvalError(
        `TranscribeHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: TranscribeRequestAdapter["payload"],
  ): Promise<TranscribeResponseAdapter["payload"]> {
    try {
      return await this.client.audio.transcriptions.create(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `TranscribeHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

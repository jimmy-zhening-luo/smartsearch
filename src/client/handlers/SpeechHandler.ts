import Handler from "./handler/Handler.js";
import SpeechRequestAdapter from "./handler/adapters/requests/SpeechRequestAdapter.js";
import SpeechResponseAdapter from "./handler/adapters/responses/SpeechResponseAdapter.js";

export default class SpeechHandler extends Handler<
SpeechRequestAdapter,
typeof SpeechRequestAdapter,
SpeechResponseAdapter,
typeof SpeechResponseAdapter,
{
  model: Extract<SpeechRequestAdapter["payload"]["model"], string>;
  voice: Extract<SpeechRequestAdapter["payload"]["voice"], string>;
  response_format: Extract<SpeechRequestAdapter["payload"]["response_format"], string>;
}
> {
  constructor(
    client: typeof SpeechHandler.prototype.client,
    defaults: typeof SpeechHandler.prototype.defaults,
  ) {
    try {
      super(
        SpeechRequestAdapter,
        SpeechResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `SpeechHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    input: string,
    speed?: number,
    voice: Extract<SpeechRequestAdapter["payload"]["voice"], string> = this.defaults.voice,
    response_format: Extract<SpeechRequestAdapter["payload"]["response_format"], string> = this.defaults.response_format,
    model: Extract<SpeechRequestAdapter["payload"]["model"], string> = this.defaults.model,
  ): ConstructorParameters<typeof SpeechRequestAdapter> {
    try {
      return [
        model,
        voice,
        input,
        speed,
        response_format,
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
    requestPayload: SpeechRequestAdapter["payload"],
  ): Promise<SpeechResponseAdapter["payload"]> {
    try {
      return this.client.audio.speech.create(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `SpeechHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}

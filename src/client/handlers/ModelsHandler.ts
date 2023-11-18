import Handler from "./handler/Handler.js";
import ModelsRequestAdapter from "./handler/adapters/requests/ModelsRequestAdapter.js";
import ModelsResponseAdapter from "./handler/adapters/responses/ModelsResponseAdapter.js";

export default class ChatHandler extends Handler<
ModelsRequestAdapter,
ModelsResponseAdapter
> {
  build(...inputs: Parameters<ModelsRequestAdapter["build"]>): ModelsRequestAdapter {
    try {
      return new ModelsRequestAdapter(...inputs);
    }
    catch (e) {
      throw new SyntaxError(
        `ChatHandler: build: Error building ChatRequestAdapter from inputs`,
        {
          cause: e,
        },
      );
    }
  }

  async handle(): Promise<ModelsResponseAdapter["payload"]> {
    try {
      return await this.client.models.list();
    }
    catch (e) {
      throw new EvalError(
        `ChatHandler: handle: Error using native client function to submit request to OpenAI API`,
        {
          cause: e,
        },
      );
    }
  }

  parse(responsePayload: ModelsResponseAdapter["payload"]): ModelsResponseAdapter {
    try {
      return new ModelsResponseAdapter(responsePayload);
    }
    catch (e) {
      throw new SyntaxError(
        `ChatHandler: parse: Error building ChatResponseAdapter from response payload`,
        {
          cause: e,
        },
      );
    }
  }
}

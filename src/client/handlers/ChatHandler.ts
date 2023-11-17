import Handler from "./handler/Handler.js";
import ChatRequestAdapter from "./handler/adapters/requests/ChatRequestAdapter.js";
import ChatResponseAdapter from "./handler/adapters/responses/ChatResponseAdapter.js";

export default class ChatHandler extends Handler<
  ChatRequestAdapter,
  ChatResponseAdapter
> {
  build(
    ...inputs: Parameters<ChatRequestAdapter["build"]>
  ): ChatRequestAdapter {
    try {
      return new ChatRequestAdapter(...inputs);
    } catch (e) {
      throw new SyntaxError(
        `ChatHandler: build: Error building ChatRequestAdapter from inputs`,
        {
          cause: e,
        },
      );
    }
  }

  async handle(
    requestPayload: ChatRequestAdapter["payload"],
  ): Promise<ChatResponseAdapter["payload"]> {
    try {
      return await this.client.chat.completions.create(requestPayload);
    } catch (e) {
      throw new EvalError(
        `ChatHandler: handle: Error using native client function to submit request to OpenAI API`,
        {
          cause: e,
        },
      );
    }
  }

  parse(responsePayload: ChatResponseAdapter["payload"]): ChatResponseAdapter {
    try {
      return new ChatResponseAdapter(responsePayload);
    } catch (e) {
      throw new SyntaxError(
        `ChatHandler: parse: Error building ChatResponseAdapter from response payload`,
        {
          cause: e,
        },
      );
    }
  }
}

import ChatResponseAdapter from "./ChatResponseAdapter.js";

/**
  * When using JSON mode, always instruct the model to produce JSON via some message in the conversation, for example via your system message. If you don't include an explicit instruction to generate JSON, the model may generate an unending stream of whitespace and the request may run continually until it reaches the token limit. To help ensure you don't forget, the API will throw an error if the string "JSON" does not appear somewhere in the context.
  * The JSON in the message the model returns may be partial (i.e. cut off) if finish_reason is length, which indicates the generation exceeded max_tokens or the conversation exceeded the token limit. To guard against this, check finish_reason before parsing the response.
  * If you are using JSON mode, you should also use the stop and restart endpoints to manage the state of the conversation. This will ensure the conversation is reset and the model is ready to generate a new response.
  * JSON mode will not guarantee the output matches any specific schema, only that it is valid and parses without errors.
 */
export default class ChatJsonResponseAdapter extends ChatResponseAdapter {
  constructor(payload: ChatResponseAdapter["payload"]) {
    try {
      super(payload);
      if (this.unpacked.exit === "length")
        throw new RangeError(
          `Response had finish_reason of length, which means the returned JSON is not readable due to being cut off.`,
        );
      else
        JSON.parse(this.unpacked.answer);
    }
    catch (e) {
      throw new EvalError(
        `ChatJsonResponseAdapter: ctor: Failed to instantiate concrete response adapter with unpacked payload`,
        { cause: e },
      );
    }
  }
}

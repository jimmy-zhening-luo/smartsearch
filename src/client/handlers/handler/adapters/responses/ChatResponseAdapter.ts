import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type ChatResponsePayload = OpenAI.ChatCompletion;
type ChatResponseOutput = {
  model: string;
  answer: string;
  exit: OpenAI.ChatCompletion.Choice["finish_reason"];
};

export default class ChatResponseAdapter extends ResponseAdapter<
  ChatResponsePayload,
  ChatResponseOutput
> {
  parse(payload: ChatResponsePayload): ChatResponseOutput {
    try {
      if (payload.choices.length === 0 || payload.choices[0] === undefined)
        throw new SyntaxError(
          `ChatResponseAdapter: parse: Response contains no 'choices' records`,
        );
      else {
        try {
          return {
            model: payload.model,
            answer: payload.choices[0].message.content ?? "",
            exit: payload.choices[0].finish_reason,
          };
        } catch (e) {
          throw new SyntaxError(
            `ChatResponseAdapter: parse: Error building response 'output' from properties in 'payload'`,
            {
              cause: e,
            },
          );
        }
      }
    } catch (e) {
      throw new SyntaxError(
        `ChatResponseAdapter: parse: Error parsing response`,
        {
          cause: e,
        },
      );
    }
  }
}

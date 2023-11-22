import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type ChatResponsePayload = OpenAI.ChatCompletion;
type ChatResponseOutput = {
  answer: string;
  model: Extract<ChatResponsePayload["model"], string>;
  exit: Extract<ChatResponsePayload["choices"][0]["finish_reason"], string>;
};

export default class ChatResponseAdapter
  extends ResponseAdapter<ChatResponsePayload, ChatResponseOutput> {
  parse(payload: ChatResponsePayload): ChatResponseOutput {
    try {
      if (payload.choices.length === 0 || payload.choices[0] === undefined)
        throw new SyntaxError(
          `ChatResponseAdapter: parse: Response contains no 'choices' records`,
        );
      else {
        try {
          return {
            answer: payload.choices[0].message.content ?? "",
            model: payload.model,
            exit: payload.choices[0].finish_reason,
          };
        }
        catch (e) {
          throw new SyntaxError(
            `ChatResponseAdapter: parse: Error building response 'output' from properties in 'payload'`,
            {
              cause: e,
            },
          );
        }
      }
    }
    catch (e) {
      throw new SyntaxError(
        `ChatResponseAdapter: parse: Error parsing response`,
        {
          cause: e,
        },
      );
    }
  }
}

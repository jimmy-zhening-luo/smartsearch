import type OpenAI from "openai";
import ResponseAdapter from "./response/ResponseAdapter.js";

type ModelsResponsePayload = OpenAI.Models.ModelsPage;
type ModelsResponseOutput = {
  models: string[];
};

export default class ModelsResponseAdapter extends ResponseAdapter<
  ModelsResponsePayload,
  ModelsResponseOutput
> {
  parse(payload: ModelsResponsePayload): ModelsResponseOutput {
    try {
      if (payload.data.length === 0)
        throw new SyntaxError(
          `ModelsResponseAdapter: parse: Response contains no 'data' records`,
        );
      else {
        try {
          return {
            models: payload.data.map(model => model.id),
          };
        } catch (e) {
          throw new SyntaxError(
            `ModelsResponseAdapter: parse: Error building response 'output' from properties in 'payload'`,
            {
              cause: e,
            },
          );
        }
      }
    } catch (e) {
      throw new SyntaxError(
        `ModelsResponseAdapter: parse: Error parsing response`,
        {
          cause: e,
        },
      );
    }
  }
}

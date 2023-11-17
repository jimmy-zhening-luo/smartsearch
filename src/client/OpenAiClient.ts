import dotenv from "dotenv";
import OpenAI from "openai";

import ChatHandler from "./handlers/ChatHandler.js";
import ModelsHandler from "./handlers/ModelsHandler.js";

// import fs from 'fs';
// import fetch from 'node-fetch';
// import { toFile } from 'openai';

export default class OpenAIClient {
  openai: OpenAI;

  constructor(
    openai?: { apiKey: string; organization?: string } | OpenAI | OpenAIClient,
  ) {
    try {
      if (openai === undefined) this.openai = this.initialize();
      else if (openai instanceof OpenAI) this.openai = openai;
      else if ("apiKey" in openai) {
        this.openai =
          "organization" in openai
            ? new OpenAI(openai)
            : new OpenAI({ apiKey: openai.apiKey });
      } else this.openai = openai.openai;
    } catch (e) {
      throw new EvalError(
        `OpenAIClient: ctor: Error constructing OpenAIClient instance`,
        {
          cause: e,
        },
      );
    }
  }

  protected initialize(): OpenAI {
    try {
      try {
        dotenv.config();
      } catch (e) {
        throw new EvalError(
          `OpenAIClient: initialize: Error hydrating dotenv`,
          {
            cause: e,
          },
        );
      }
      try {
        const apiKey: string = process.env.OPENAI_API_KEY ?? "";
        const organization: string = process.env.OPENAI_ORG_ID ?? "";
        return new OpenAI({
          apiKey: apiKey,
          organization: organization,
        });
      } catch (e) {
        throw new EvalError(
          `OpenAIClient: initialize: Error calling OpenAI native ctor by passing params populated from env`,
          {
            cause: e,
          },
        );
      }
    } catch (e) {
      throw new EvalError(
        `OpenAIClient: initialize: Error initializing OpenAI native client from env`,
        {
          cause: e,
        },
      );
    }
  }

  // ChatCompletion
  async chat(
    ...args: Parameters<ChatHandler["build"]>
  ): ReturnType<ChatHandler["submit"]> {
    try {
      return await new ChatHandler(this.openai, ...args).submit();
    } catch (e) {
      throw new EvalError(`OpenAIClient: chat: Error submitting chat request`, {
        cause: e,
      });
    }
  }

  // Models
  async models(): ReturnType<ModelsHandler["submit"]> {
    try {
      return await new ModelsHandler(this.openai).submit();
    } catch (e) {
      throw new EvalError(
        `OpenAIClient: models: Error submitting models request`,
        {
          cause: e,
        },
      );
    }
  }
}

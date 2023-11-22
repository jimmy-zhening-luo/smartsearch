import dotenv from "dotenv";
import path from "path";
import OpenAI from "openai";
import ChatHandler from "./handlers/ChatHandler.js";
import ModelsHandler from "./handlers/ModelsHandler.js";
// import fs from 'fs';
// import fetch from 'node-fetch';
// import { toFile } from 'openai';

const DEFAULT_OUTPUT_RELATIVE_PATH: string = "output";

export default class OpenAIClient {
  constructor(
    openai?: {
      apiKey: string;
      organization?: string;
    }
    | OpenAI
    | OpenAIClient,
    outputDirectory?: string,
  ) {
    try {
      if (openai instanceof OpenAIClient) {
        this.openai = openai.openai;
        this.outputDirectory = outputDirectory ?? openai.outputDirectory;
      }
      else {
        if (!openai || outputDirectory === undefined) {
          try {
            dotenv.config();
          }
          catch (e) {
            throw new EvalError(`Error hydrating dotenv`, { cause: e });
          }
        }

        if (openai instanceof OpenAI) this.openai = openai;
        else if (openai) this.openai = openai;
        else {
          if (process.env.OPENAI_API_KEY === undefined)
            throw new SyntaxError(`process.env.OPENAI_API_KEY is undefined`);
          else {
            this.openai = process.env.OPENAI_ORG_KEY !== undefined
              ? {
                  apiKey: process.env.OPENAI_API_KEY,
                  organization: process.env.OPENAI_ORG_KEY,
                }
              : {
                  apiKey: process.env.OPENAI_API_KEY,
                };
          }
        }

        this.outputDirectory = outputDirectory
          ?? process.env.OUTPUT_DIRECTORY
          ?? path.join(
            process.cwd(),
            DEFAULT_OUTPUT_RELATIVE_PATH,
          );
      }
    }

    catch (e) {
      throw new EvalError(
        `OpenAIClient: ctor: Failed to construct OpenAIClient instance`,
        {
          cause: e,
        },
      );
    }
  }

  get openai(): OpenAI {
    return this.openai;
  }

  set openai(openai: { apiKey: string; organization?: string } | OpenAI) {
    try {
      if (openai instanceof OpenAI) this.openai = openai;
      else {
        if (openai.apiKey === "")
          throw new SyntaxError(`apiKey cannot be an empty string`);
        else if (openai.organization !== undefined && openai.organization === "")
          throw new SyntaxError(`organization cannot be an empty string`);
        else this.openai = new OpenAI(openai);
      }
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: set openai: Failed to set openai`,
        {
          cause: e,
        },
      );
    }
  }

  get outputDirectory(): string {
    return this.outputDirectory;
  }

  set outputDirectory(outputDirectory: string) {
    try {
      if (outputDirectory === "")
        throw new SyntaxError(`outputDirectory cannot be empty`);
      else if (path.parse(outputDirectory).base !== "")
        throw new TypeError(`outputDirectory must be a directory, not a filepath.`);
      else {
        this.outputDirectory = path.normalize(
          path.resolve(outputDirectory),
        );
        if (this.outputDirectory === path.normalize(process.cwd()))
          this.outputDirectory = path.normalize(
            path.join(process.cwd(), DEFAULT_OUTPUT_RELATIVE_PATH),
          );
      }
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: set outputDirectory: Failed to set outputDirectory`,
        {
          cause: e,
        },
      );
    }
  }

  // ChatCompletion
  async chat(...args: Parameters<ChatHandler["build"]>): ReturnType<ChatHandler["submit"]> {
    try {
      return await new ChatHandler(
        this.openai,
        ...args,
      )
        .submit();
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: chat: Error submitting chat request`,
        {
          cause: e,
        },
      );
    }
  }

  // Models
  async models(): ReturnType<ModelsHandler["submit"]> {
    try {
      return await new ModelsHandler(this.openai)
        .submit();
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: models: Error submitting models request`,
        {
          cause: e,
        },
      );
    }
  }
}

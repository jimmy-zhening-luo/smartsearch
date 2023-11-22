import dotenv from "dotenv";
import OpenAI from "openai";
import ChatHandler from "./handlers/ChatHandler.js";
import ModelsHandler from "./handlers/ModelsHandler.js";
import InputDirectory from "./directories/InputDirectory.js";
import OutputDirectory from "./directories/OutputDirectory.js";
// import fs from 'fs';
// import fetch from 'node-fetch';
// import { toFile } from 'openai';

export default class OpenAIClient {
  constructor(
    openai?: {
      apiKey: string;
      organization?: string;
    }
    | OpenAI
    | OpenAIClient,
    outputDirectory?: string | OutputDirectory,
    inputDirectory?: string | OutputDirectory,
  ) {
    try {
      if (openai instanceof OpenAIClient) {
        this.openai = openai.openai;
        this.outputDirectory = outputDirectory === undefined
          ? openai.outputPath
          : new OutputDirectory(outputDirectory);
        this.inputDirectory = inputDirectory === undefined
          ? openai.inputPath
          : new InputDirectory(inputDirectory);
      }
      else {
        if (
          !openai
          || outputDirectory === undefined
          || inputDirectory === undefined
        ) {
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

        this.outputDirectory = outputDirectory ?? process.env.OUTPUT_DIRECTORY;
        this.inputDirectory = inputDirectory ?? process.env.INPUT_DIRECTORY;
      }
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: ctor: Failed to construct OpenAIClient instance`,
        { cause: e },
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
        { cause: e },
      );
    }
  }

  protected get inputDirectory(): InputDirectory {
    return this.inputDirectory;
  }

  protected set inputDirectory(
    inputDirectory: undefined | string | InputDirectory,
  ) {
    try {
      this.inputDirectory = new InputDirectory(inputDirectory);
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: protected set inputDirectory: Failed to set inputDirectory`,
        { cause: e },
      );
    }
  }

  get inputPath(): string {
    return this.inputDirectory.path;
  }

  set inputPath(inputPath: undefined | string | InputDirectory) {
    try {
      this.inputDirectory = inputPath;
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: set inputPath: Failed to set inputPath`,
        { cause: e },
      );
    }
  }

  protected get outputDirectory(): OutputDirectory {
    return this.outputDirectory;
  }

  protected set outputDirectory(
    outputDirectory: undefined | string | OutputDirectory,
  ) {
    try {
      this.outputDirectory = new OutputDirectory(outputDirectory);
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: protected set outputDirectory: Failed to set outputDirectory`,
        { cause: e },
      );
    }
  }

  get outputPath(): string {
    return this.outputDirectory.path;
  }

  set outputPath(outputPath: undefined | string | OutputDirectory) {
    try {
      this.outputDirectory = outputPath;
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: set outputPath: Failed to set outputPath`,
        { cause: e },
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
        { cause: e },
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
        { cause: e },
      );
    }
  }
}

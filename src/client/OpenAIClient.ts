/* Imports */
// Project
import dotenv from "dotenv";
import OpenAI from "openai";

// Handlers
import ChatHandler from "./handlers/ChatHandler.js";
import ModelsHandler from "./handlers/ModelsHandler.js";

// Operators
import InputDirectory from "./operators/filesystem/directories/InputDirectory.js";
import OutputDirectory from "./operators/filesystem/directories/OutputDirectory.js";

/* Client Implementation */
export default class OpenAIClient {
  protected openai: OpenAI;
  protected outputDirectory: OutputDirectory;
  protected inputDirectory: InputDirectory;

  constructor(
    openai?:
    | OpenAIClient
    | OpenAI
    | {
      apiKey: string;
      organization?: string;
    },
    outputDirectory?: OutputDirectory | string,
    inputDirectory?: InputDirectory | string,
  ) {
    try {
      if (openai instanceof OpenAIClient) {
        this.openai = this._createInternalClient(openai.openai);
        this.outputDirectory = new OutputDirectory(
          outputDirectory === undefined
            ? openai.outputDirectory
            : new OutputDirectory(outputDirectory),
        );
        this.inputDirectory = new InputDirectory(
          inputDirectory === undefined
            ? openai.inputDirectory
            : new InputDirectory(inputDirectory),
        );
      }
      else {
        if (
          !openai
          || outputDirectory === undefined
          || inputDirectory === undefined
        ) {
          dotenv.config();
        }

        if (openai !== undefined)
          this.openai = this._createInternalClient(openai);
        else {
          if (process.env.OPENAI_API_KEY === undefined)
            throw new SyntaxError(`process.env.OPENAI_API_KEY is undefined`);
          else {
            this.openai = this._createInternalClient(
              process.env.OPENAI_ORG_ID !== undefined
                ? {
                    apiKey: process.env.OPENAI_API_KEY,
                    organization: process.env.OPENAI_ORG_ID,
                  }
                : {
                    apiKey: process.env.OPENAI_API_KEY,
                  },
            );
          }
        }

        this.outputDirectory = new OutputDirectory(
          outputDirectory ?? process.env.OUTPUT_DIRECTORY,
        );
        this.inputDirectory = new InputDirectory(
          inputDirectory ?? process.env.INPUT_DIRECTORY,
        );
      }
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: ctor: Failed to construct OpenAIClient instance`,
        { cause: e },
      );
    }
  }

  private _createInternalClient(
    openai:
    {
      apiKey: string;
      organization?: string;
    }
    | OpenAI,
  ): OpenAI {
    try {
      if (openai instanceof OpenAI)
        return openai;
      else {
        if (openai.apiKey === "")
          throw new SyntaxError(`apiKey cannot be an empty string`);
        else if (openai.organization !== undefined && openai.organization === "")
          throw new SyntaxError(`organization cannot be an empty string`);
        else
          return new OpenAI(openai);
      }
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: private _createInternalClient: Failed to return a native OpenAI client instance from the provided params`,
        { cause: e },
      );
    }
  }

  protected returnObject(
    object: Record<string, unknown>,
  ): Record<string, unknown> {
    try {
      return object;
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: protected returnObject: Failed to return object`,
        { cause: e },
      );
    }
  }

  // ChatCompletion
  async chat(...requestInput: ConstructorParameters<ChatHandler["reqCtor"]>): ReturnType<ChatHandler["submit"]> {
    try {
      return await new ChatHandler(
        this.openai,
        ...requestInput,
      )
        .submit();
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: chat: Failed to submit chat request`,
        { cause: e },
      );
    }
  }

  // Models
  async models(): ReturnType<ModelsHandler["submit"]> {
    try {
      return await new ModelsHandler(
        this.openai,
      )
        .submit();
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: models: Failed to submit models request`,
        { cause: e },
      );
    }
  }
}

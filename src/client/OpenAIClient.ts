/* Imports */
// Project
import OpenAI from "openai";
import ClientDefaults from "./defaults/ClientDefaults.js";

// Handlers
import ChatHandler from "./handlers/ChatHandler.js";
import ModelsHandler from "./handlers/ModelsHandler.js";

// Operators
import InputDirectory from "./operators/filesystem/directories/InputDirectory.js";
import OutputDirectory from "./operators/filesystem/directories/OutputDirectory.js";

/* Client Implementation */
export default class OpenAIClient {
  protected readonly openai: OpenAI;
  protected readonly defaults: ClientDefaults;
  protected readonly directories: {
    input: InputDirectory;
    output: OutputDirectory;
  };
  protected readonly handlers: {
    chat: ChatHandler;
    models: ModelsHandler;
  };

  constructor(
    client?:
    | OpenAIClient
    | OpenAI
    | {
      apiKey: string;
      organization?: string;
    },
    inputDirectory?: InputDirectory | string,
    outputDirectory?: OutputDirectory | string,
    overrideDefaults?: ClientDefaults,
  ) {
    try {
      if (client instanceof OpenAIClient) {
        this.openai = client.openai;
        this.defaults = overrideDefaults ?? client.defaults;
        this.directories = {
          input: new InputDirectory(
            inputDirectory ?? client.directories.input,
            this.defaults.settings.DEFAULT_INPUT_RELATIVE_PATH,
          ),
          output: new OutputDirectory(
            outputDirectory ?? client.directories.output,
            this.defaults.settings.DEFAULT_OUTPUT_RELATIVE_PATH,
          ),
        };
      }
      else {
        this.defaults = overrideDefaults ?? new ClientDefaults();
        this.directories = {
          input: new InputDirectory(
            inputDirectory ?? this.defaults.settings.INPUT_DIRECTORY,
            this.defaults.settings.DEFAULT_INPUT_RELATIVE_PATH,
          ),
          output: new OutputDirectory(
            outputDirectory ?? this.defaults.settings.OUTPUT_DIRECTORY,
            this.defaults.settings.DEFAULT_OUTPUT_RELATIVE_PATH,
          ),
        };

        if (client instanceof OpenAI)
          this.openai = client;
        else {
          if (client === undefined) {
            const organization: string | undefined = this
              .defaults.settings
              .OPENAI_ORG_ID;

            client = organization === undefined
              ? {
                  apiKey: this.defaults.settings.OPENAI_API_KEY,
                }
              : {
                  apiKey: this.defaults.settings.OPENAI_API_KEY,
                  organization: organization,
                };
          }
          if (client.apiKey === "")
            throw new SyntaxError(`apiKey cannot be an empty string`);
          else if (client.organization !== undefined && client.organization === "")
            throw new SyntaxError(`organization cannot be an empty string. If you do not have an organization, omit this member from the input object.`);
          else
            this.openai = new OpenAI(client);
        }
      }
      this.handlers = this._createHandlers(
        this.openai,
        this.defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: ctor: Failed to construct OpenAIClient instance`,
        { cause: e },
      );
    }
  }

  private _createHandlers(
    openai: OpenAI,
    defaults: ClientDefaults,
  ): {
      chat: ChatHandler;
      models: ModelsHandler;
    } {
    try {
      return {
        chat: new ChatHandler(
          openai,
          {
            model: defaults.settings.DEFAULT_CHAT_MODEL,
          },
        ),
        models: new ModelsHandler(
          openai,
          undefined,
        ),
      };
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: _createHandlers: Failed to create handlers`,
        { cause: e },
      );
    }
  }

  // ChatCompletion
  async chat(...input: Parameters<ChatHandler["submit"]>): ReturnType<ChatHandler["submit"]> {
    try {
      return await this.handlers.chat.submit(...input);
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: chat: Failed to submit chat request`,
        { cause: e },
      );
    }
  }

  // Models
  async models(...input: Parameters<ModelsHandler["submit"]>): ReturnType<ModelsHandler["submit"]> {
    try {
      return await this.handlers.models.submit(...input);
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: models: Failed to submit models request`,
        { cause: e },
      );
    }
  }
}

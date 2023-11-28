/* Imports */
// Project
import OpenAI from "openai";
import ClientDefaults from "./defaults/ClientDefaults.js";

// Handlers
import ChatHandler from "./handlers/ChatHandler.js";
import ModelsHandler from "./handlers/ModelsHandler.js";
import SpeechHandler from "./handlers/SpeechHandler.js";

// Operators
import InputDirectory from "./operators/filesystem/directories/InputDirectory.js";
import OutputDirectory from "./operators/filesystem/directories/OutputDirectory.js";
import FileReader from "./operators/filesystem/files/FileReader.js";
import FileWriter from "./operators/filesystem/files/FileWriter.js";

/* Client Implementation */
export default class OpenAIClient {
  protected readonly openai: OpenAI;
  protected readonly defaults: ClientDefaults;
  protected readonly operators: {
    io: {
      dir: {
        input: InputDirectory;
        output: OutputDirectory;
      };
      file: {
        reader: FileReader;
        writer: FileWriter;
      };
    };
  };
  protected readonly handlers: {
    chat: ChatHandler;
    models: ModelsHandler;
    speech: SpeechHandler;
  };

  constructor(
    client?:
    | OpenAIClient
    | OpenAI
    | {
      apiKey: string;
      organization?: string;
    },
    overrides?: {
      inputDirectory?: InputDirectory | string;
      outputDirectory?: OutputDirectory | string;
      defaults?: ClientDefaults;
    },
  ) {
    try {
      if (client instanceof OpenAIClient) {
        this.openai = new OpenAI(
          {
            apiKey: client.openai.apiKey,
            organization: client.openai.organization,
          },
        );
        if (overrides === undefined) {
          this.defaults = new ClientDefaults(client.defaults);
          this.operators = { ...client.operators };
          this.handlers = { ...client.handlers };
        }
        else {
          this.defaults = overrides.defaults ?? client.defaults;
          this.operators = this._createOperators(
            this.defaults,
            overrides.inputDirectory ?? client
              .operators
              .io
              .dir
              .input,
            overrides.outputDirectory ?? client
              .operators
              .io
              .dir
              .output,
          );
          this.handlers = this._createHandlers(
            this.defaults,
            this.openai,
          );
        }
      }
      else {
        this.defaults = overrides?.defaults ?? new ClientDefaults();
        this.openai = new OpenAI(
          client instanceof OpenAI
            ? {
                apiKey: client.apiKey,
                organization: client.organization,
              }
            : {
                apiKey: client?.apiKey ?? this.defaults.settings.OPENAI_API_KEY,
                organization: client?.organization
               ?? this.defaults.settings.OPENAI_ORG_ID ?? null,
              },
        );
        this.operators = this._createOperators(
          this.defaults,
          overrides?.inputDirectory ?? this.defaults.settings.INPUT_DIRECTORY,
          overrides?.outputDirectory ?? this.defaults.settings.OUTPUT_DIRECTORY,
        );
        this.handlers = this._createHandlers(
          this.defaults,
          this.openai,
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

  private _createOperators(
    defaults: ClientDefaults,
    inputDirectory: InputDirectory | string,
    outputDirectory: OutputDirectory | string,
  ): typeof OpenAIClient.prototype.operators {
    try {
      const input: InputDirectory = new InputDirectory(
        inputDirectory,
        defaults.settings.DEFAULT_INPUT_RELATIVE_PATH,
      );

      const output: OutputDirectory = new OutputDirectory(
        outputDirectory,
        defaults.settings.DEFAULT_OUTPUT_RELATIVE_PATH,
      );

      return {
        io: {
          dir: {
            input: new InputDirectory(input),
            output: new OutputDirectory(output),
          },
          file: {
            reader: new FileReader(input),
            writer: new FileWriter(output),
          },
        },
      };
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: _createOperators: Failed to create operators`,
        { cause: e },
      );
    }
  }

  private _createHandlers(
    defaults: ClientDefaults,
    openai: OpenAI,
  ): typeof OpenAIClient.prototype.handlers {
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
        speech: new SpeechHandler(
          openai,
          {
            model: defaults.settings.DEFAULT_SPEECH_MODEL,
            voice: defaults.settings.DEFAULT_SPEECH_VOICE,
            response_format: defaults.settings.DEFAULT_SPEECH_RESPONSE_FORMAT,
          },
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

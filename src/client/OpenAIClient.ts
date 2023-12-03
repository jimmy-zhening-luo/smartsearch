import OpenAI from "openai";
import ClientSettingRuntime from "./defaults/ClientSettingRuntime.js";

import InputDirectory from "./operators/filesystem/directories/InputDirectory.js";
import OutputDirectory from "./operators/filesystem/directories/OutputDirectory.js";
import FileReader from "./operators/filesystem/files/FileReader.js";
import FileWriter from "./operators/filesystem/files/FileWriter.js";

import ChatHandler from "./handlers/ChatHandler.js";
import ModelsHandler from "./handlers/ModelsHandler.js";
import SpeechHandler from "./handlers/SpeechHandler.js";

export default class OpenAIClient {
  protected readonly openai: OpenAI;
  protected readonly settings: ClientSettingRuntime;
  protected readonly operators: {
    io: {
      dir: {
        input: InputDirectory;
        output: OutputDirectory;
      };
      file: {
        reader: typeof FileReader;
        writer: typeof FileWriter;
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
    OpenAI | OpenAIClient | {
      apiKey: string;
      organization?: string;
    },
    overrides?: {
      inputDirectory?: InputDirectory | string;
      outputDirectory?: OutputDirectory | string;
      defaults?: ClientSettingRuntime;
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
          this.settings = new ClientSettingRuntime(client.settings);
          this.operators = { ...client.operators };
          this.handlers = { ...client.handlers };
        }
        else {
          this.settings = overrides.defaults ?? client.settings;
          this.operators = this._createOperators(
            this.settings,
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
            this.settings,
            this.openai,
          );
        }
      }
      else {
        this.settings = overrides?.defaults ?? new ClientSettingRuntime();
        this.openai = new OpenAI(
          client instanceof OpenAI
            ? {
                apiKey: client.apiKey,
                organization: client.organization,
              }
            : {
                apiKey: client?.apiKey ?? this.settings.env.OPENAI_API_KEY ?? "",
                organization: client?.organization
               ?? this.settings.env.OPENAI_ORG_ID,
              },
        );
        this.operators = this._createOperators(
          this.settings,
          overrides?.inputDirectory ?? this.settings.env.INPUT_DIRECTORY,
          overrides?.outputDirectory ?? this.settings.env.OUTPUT_DIRECTORY,
        );
        this.handlers = this._createHandlers(
          this.settings,
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

  public async chat(...input: Parameters<ChatHandler["submit"]>): ReturnType<ChatHandler["submit"]> {
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

  public async models(...input: Parameters<ModelsHandler["submit"]>): ReturnType<ModelsHandler["submit"]> {
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

  public async speech(fileName: string, ...input: Parameters<SpeechHandler["submit"]>): Promise<void> {
    try {
      await new this.operators.io.file.writer(
        this.operators.io.dir.output,
        fileName,
      )
        .write(
          this.handlers.speech.submit(...input),
        );
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: speech: Failed to submit speech request`,
        { cause: e },
      );
    }
  }

  private _createOperators(
    settings: ClientSettingRuntime,
    inputDirectory: InputDirectory | string,
    outputDirectory: OutputDirectory | string,
  ): typeof OpenAIClient.prototype.operators {
    try {
      const input: InputDirectory = new InputDirectory(
        inputDirectory,
        settings.const.DEFAULT_INPUT_RELATIVE_PATH,
      );

      const output: OutputDirectory = new OutputDirectory(
        outputDirectory,
        settings.const.DEFAULT_OUTPUT_RELATIVE_PATH,
      );

      return {
        io: {
          dir: {
            input: new InputDirectory(input),
            output: new OutputDirectory(output),
          },
          file: {
            reader: FileReader,
            writer: FileWriter,
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
    settings: ClientSettingRuntime,
    openai: OpenAI,
  ): typeof OpenAIClient.prototype.handlers {
    try {
      return {
        chat: new ChatHandler(
          openai,
          {
            model: settings.const.DEFAULT_CHAT_MODEL,
          },
        ),
        models: new ModelsHandler(
          openai,
          null,
        ),
        speech: new SpeechHandler(
          openai,
          {
            model: settings.const.DEFAULT_SPEECH_MODEL,
            voice: settings.const.DEFAULT_SPEECH_VOICE,
            response_format: settings.const.DEFAULT_SPEECH_RESPONSE_FORMAT,
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
}

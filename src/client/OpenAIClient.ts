import OpenAI from "openai";
import ClientSettingRuntime from "./defaults/ClientSettingRuntime.js";

import InputDirectory from "./operators/filesystem/directories/InputDirectory.js";
import OutputDirectory from "./operators/filesystem/directories/OutputDirectory.js";
import FileReader from "./operators/filesystem/files/FileReader.js";
import FileWriter from "./operators/filesystem/files/FileWriter.js";

import ChatHandler from "./handlers/ChatHandler.js";
import ChatJsonHandler from "./handlers/ChatJsonHandler.js";
import ChatVisionHandler from "./handlers/ChatVisionHandler.js";
import ImageHandler from "./handlers/ImageHandler.js";
import ModelsHandler from "./handlers/ModelsHandler.js";
import ReimageHandler from "./handlers/ReimageHandler.js";
import SpeechHandler from "./handlers/SpeechHandler.js";
import TranscribeHandler from "./handlers/TranscribeHandler.js";
import TranslateHandler from "./handlers/TranslateHandler.js";

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
    chatJson: ChatJsonHandler;
    chatVision: ChatVisionHandler;
    image: ImageHandler;
    models: ModelsHandler;
    reimage: ReimageHandler;
    speech: SpeechHandler;
    transcribe: TranscribeHandler;
    translate: TranslateHandler;
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

  public async chatJson(...input: Parameters<ChatJsonHandler["submit"]>): ReturnType<ChatJsonHandler["submit"]> {
    try {
      return await this.handlers.chatJson.submit(...input);
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: chatJson: Failed to submit chatJson request`,
        { cause: e },
      );
    }
  }

  public async image(...input: Parameters<ImageHandler["submit"]>): ReturnType<ImageHandler["submit"]> {
    try {
      return await this.handlers.image.submit(...input);
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: image: Failed to submit image request`,
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

  public async speech(outFileName: string, ...input: Parameters<SpeechHandler["submit"]>): Promise<void> {
    try {
      await new this.operators.io.file.writer(
        this.operators.io.dir.output,
        outFileName,
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

  public async transcribe(
    inFileName: string,
    inputLanguage?: Parameters<TranscribeHandler["submit"]>[1],
    instructions?: Parameters<TranscribeHandler["submit"]>[2],
    outputType?: Parameters<TranscribeHandler["submit"]>[3],
    model?: Parameters<TranscribeHandler["submit"]>[4],
  ): ReturnType<TranscribeHandler["submit"]> {
    try {
      return await this.handlers.transcribe.submit(
        await new this.operators.io.file.reader(
          this.operators.io.dir.input,
          inFileName,
        )
          .read(),
        inputLanguage,
        instructions,
        outputType,
        model,
      );
    }
    catch (e) {
      throw new EvalError(
        `OpenAIClient: transcribe: Failed to submit transcribe request`,
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
        settings.consts.DEFAULT_INPUT_RELATIVE_PATH,
      );

      const output: OutputDirectory = new OutputDirectory(
        outputDirectory,
        settings.consts.DEFAULT_OUTPUT_RELATIVE_PATH,
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
            model: settings.consts.DEFAULT_CHAT_MODEL,
          },
        ),
        chatJson: new ChatJsonHandler(
          openai,
          {
            model: settings.consts.DEFAULT_CHAT_JSON_MODEL,
            jsonInstruction: settings.consts.DEFAULT_CHAT_JSON_INSTRUCTION,
            temperature: settings.consts.DEFAULT_CHAT_JSON_TEMPERATURE,
            seed: settings.consts.DEFAULT_CHAT_JSON_SEED,
          },
        ),
        chatVision: new ChatVisionHandler(
          openai,
          {
            model: settings.consts.DEFAULT_CHAT_VISION_MODEL,
            maxTokens: settings.consts.DEFAULT_CHAT_VISION_MAX_TOKENS,
          },
        ),
        image: new ImageHandler(
          openai,
          {
            model: settings.consts.DEFAULT_IMAGE_MODEL,
            count: settings.consts.DEFAULT_IMAGE_COUNT,
            quality: settings.consts.DEFAULT_IMAGE_QUALITY,
            style: settings.consts.DEFAULT_IMAGE_STYLE,
            shape: settings.consts.DEFAULT_IMAGE_SHAPE,
            shapeDimensions: {
              landscape: settings.consts.DEFAULT_IMAGE_LANDSCAPE_DIMENSIONS,
              portrait: settings.consts.DEFAULT_IMAGE_PORTRAIT_DIMENSIONS,
              square: settings.consts.DEFAULT_IMAGE_SQUARE_DIMENSIONS,
            },
            outputType: settings.consts.DEFAULT_IMAGE_OUTPUT_TYPE,
          },
        ),
        models: new ModelsHandler(
          openai,
          null,
        ),
        reimage: new ReimageHandler(
          openai,
          {
            model: settings.consts.DEFAULT_REIMAGE_MODEL,
            count: settings.consts.DEFAULT_REIMAGE_COUNT,
            dimensions: settings.consts.DEFAULT_REIMAGE_DIMENSIONS,
            outputType: settings.consts.DEFAULT_REIMAGE_OUTPUT_TYPE,
          },
        ),
        speech: new SpeechHandler(
          openai,
          {
            model: settings.consts.DEFAULT_SPEECH_MODEL,
            voice: settings.consts.DEFAULT_SPEECH_VOICE,
            outputType: settings.consts.DEFAULT_SPEECH_OUTPUT_TYPE,
          },
        ),
        transcribe: new TranscribeHandler(
          openai,
          {
            model: settings.consts.DEFAULT_TRANSCRIBE_MODEL,
          },
        ),
        translate: new TranslateHandler(
          openai,
          {
            model: settings.consts.DEFAULT_TRANSLATE_MODEL,
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

import dotenv from "dotenv";
import path from "path";
import Config from "./config/Config.js";
import type OpenAI from "openai";
import type ClientSettings from "./ClientSettings.js";

const DEFAULT_INPUT_RELATIVE_PATH = "input";
const DEFAULT_OUTPUT_RELATIVE_PATH = "output";

export default class ClientDefaults
  extends Config<ClientSettings> {
  constructor() {
    try {
      dotenv.config();

      const settings: ClientSettings = {
        OPENAI_API_KEY: ClientDefaults
          .getEnv(
            "OPENAI_API_KEY",
          ) ?? "",
        INPUT_DIRECTORY: ClientDefaults
          .getEnv("INPUT_DIRECTORY") ?? path.join(process.cwd(), DEFAULT_INPUT_RELATIVE_PATH),
        OUTPUT_DIRECTORY: ClientDefaults
          .getEnv("OUTPUT_DIRECTORY") ?? path.join(process.cwd(), DEFAULT_OUTPUT_RELATIVE_PATH),
        DEFAULT_INPUT_RELATIVE_PATH,
        DEFAULT_OUTPUT_RELATIVE_PATH,
        DEFAULT_CHAT_MODEL: ClientDefaults
          .getEnvCoerce<OpenAI.ChatCompletionCreateParamsNonStreaming["model"]>("DEFAULT_CHAT_MODEL") ?? "gpt-4-1106-preview",
        DEFAULT_SPEECH_MODEL: ClientDefaults
          .getEnvCoerce<OpenAI.Audio.SpeechCreateParams["model"]>("DEFAULT_SPEECH_MODEL") ?? "tts-1-hd",
        DEFAULT_SPEECH_VOICE: ClientDefaults
          .getEnvCoerce<OpenAI.Audio.SpeechCreateParams["voice"]>("DEFAULT_SPEECH_VOICE") ?? "alloy",
        DEFAULT_SPEECH_RESPONSE_FORMAT: ClientDefaults
          .getEnvCoerce<OpenAI.Audio.SpeechCreateParams["response_format"]>("DEFAULT_SPEECH_RESPONSE_FORMAT") ?? "mp3",
      };

      if (Config.getEnv("OPENAI_ORG_ID") !== undefined)
        settings.OPENAI_ORG_ID = Config.getEnv("OPENAI_ORG_ID") ?? "";

      super(settings);
    }
    catch (e) {
      throw new EvalError(
        `ClientDefaults: ctor: Failed to instantiate client defaults by calling parent Config ctor`,
        { cause: e },
      );
    }
  }

  static override getEnvCoerce<T>(
    key: keyof ClientSettings,
  ):
    T | undefined {
    try {
      return super.getEnvCoerce<ClientSettings, T>(key);
    }
    catch (e) {
      throw new EvalError(
        `ClientDefaults: getEnvCoerce: Failed to get environment variable ${String(key)}`,
        { cause: e },
      );
    }
  }
}

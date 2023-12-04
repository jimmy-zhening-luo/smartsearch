import path from "path";
import type { EnvConfig } from "./configs/EnvConfig.js";
import type { ConstConfig } from "./configs/ConstConfig.js";
import type { ConstSettingIds, EnvSettingIds } from "./ClientSettingIds.js";
import type { ConstSettings, EnvSettings } from "./ClientSettings.js";

export type {
  ConstSettingIds,
  ConstSettings,
  EnvSettingIds,
  EnvSettings,
};

const _INPUT = "input";
const _OUTPUT = "output";

export const DefaultConfig: {
  consts: ConstConfig<ConstSettingIds, ConstSettings>;
  env: EnvConfig<EnvSettingIds, EnvSettings>;
} = {
  consts: {
  // // Client Operations
    DEFAULT_INPUT_RELATIVE_PATH: _INPUT,
    DEFAULT_OUTPUT_RELATIVE_PATH: _OUTPUT,
    // // API Handlers
    // Chat
    DEFAULT_CHAT_MODEL: "gpt-4-1106-preview",
    DEFAULT_CHAT_JSON_MODEL: "gpt-4-1106-preview",
    DEFAULT_CHAT_VISION_MODEL: "gpt-4-vision-preview",
    // Image
    DEFAULT_IMAGE_MODEL: "dall-e-3",
    DEFAULT_IMAGE_COUNT: 1,
    DEFAULT_IMAGE_QUALITY: "hd",
    DEFAULT_IMAGE_STYLE: "vivid",
    DEFAULT_IMAGE_SHAPE: "landscape",
    DEFAULT_IMAGE_LANDSCAPE_DIMENSIONS: "1792x1024",
    DEFAULT_IMAGE_PORTRAIT_DIMENSIONS: "1024x1792",
    DEFAULT_IMAGE_SQUARE_DIMENSIONS: "1024x1024",
    DEFAULT_IMAGE_RESPONSE_FORMAT: "url",
    DEFAULT_REIMAGE_MODEL: "dall-e-2",
    DEFAULT_REIMAGE_COUNT: 6,
    DEFAULT_REIMAGE_DIMENSIONS: "1024x1024",
    DEFAULT_REIMAGE_RESPONSE_FORMAT: "url",
    // Speech
    DEFAULT_SPEECH_MODEL: "tts-1-hd",
    DEFAULT_SPEECH_VOICE: "alloy",
    DEFAULT_SPEECH_RESPONSE_FORMAT: "mp3",
    // Transcribe
    DEFAULT_TRANSCRIBE_MODEL: "whisper-1",
    // Translate
    DEFAULT_TRANSLATE_MODEL: "whisper-1",
  },
  env: {
    OPENAI_API_KEY: null,
    OPENAI_ORG_ID: null,
    // // Client Operations
    INPUT_DIRECTORY: path.join(
      process.cwd(),
      _INPUT,
    ),
    OUTPUT_DIRECTORY: path.join(
      process.cwd(),
      _OUTPUT,
    ),
  },
};

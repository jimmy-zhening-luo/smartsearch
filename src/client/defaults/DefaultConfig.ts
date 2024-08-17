import path from "path";
import type { EnvConfig } from "./configs/EnvConfig.js";
import type { ConstConfig } from "./configs/ConstConfig.js";
import type {
  ConstSettingIds,
  EnvSettingIds,
} from "./ClientSettingIds.js";
import type {
  ConstSettings,
  EnvSettings,
} from "./ClientSettings.js";

export type {
  ConstSettingIds,
  ConstSettings,
  EnvSettingIds,
  EnvSettings,
};

const _INPUT = "input",
_OUTPUT = "output";

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

    // Chat: JSON
    DEFAULT_CHAT_JSON_MODEL: "gpt-4-1106-preview",
    DEFAULT_CHAT_JSON_INSTRUCTION: "Your response must be formatted as JSON. ",
    DEFAULT_CHAT_JSON_TEMPERATURE: 0,
    DEFAULT_CHAT_JSON_SEED: 1,

    // Chat: Vision
    DEFAULT_CHAT_VISION_MODEL: "gpt-4-vision-preview",
    DEFAULT_CHAT_VISION_MAX_TOKENS: 4096,

    // Image
    DEFAULT_IMAGE_MODEL: "dall-e-3",
    DEFAULT_IMAGE_COUNT: 1,
    DEFAULT_IMAGE_QUALITY: "hd",
    DEFAULT_IMAGE_STYLE: "vivid",
    DEFAULT_IMAGE_SHAPE: "landscape",
    DEFAULT_IMAGE_LANDSCAPE_DIMENSIONS: "1792x1024",
    DEFAULT_IMAGE_PORTRAIT_DIMENSIONS: "1024x1792",
    DEFAULT_IMAGE_SQUARE_DIMENSIONS: "1024x1024",
    DEFAULT_IMAGE_OUTPUT_TYPE: "url",

    // Image: Edit
    DEFAULT_IMAGE_EDIT_MODEL: "dall-e-2",
    DEFAULT_IMAGE_EDIT_COUNT: 1,
    DEFAULT_IMAGE_EDIT_DIMENSIONS: "1024x1024",
    DEFAULT_IMAGE_EDIT_OUTPUT_TYPE: "url",

    // Image: Variation
    DEFAULT_IMAGE_VARIATION_MODEL: "dall-e-2",
    DEFAULT_IMAGE_VARIATION_COUNT: 4,
    DEFAULT_IMAGE_VARIATION_DIMENSIONS: "1024x1024",
    DEFAULT_IMAGE_VARIATION_OUTPUT_TYPE: "url",

    // Speech
    DEFAULT_SPEECH_MODEL: "tts-1-hd",
    DEFAULT_SPEECH_VOICE: "alloy",
    DEFAULT_SPEECH_OUTPUT_TYPE: "mp3",

    // Transcribe
    DEFAULT_TRANSCRIBE_MODEL: "whisper-1",

    // Translate
    DEFAULT_TRANSLATE_MODEL: "whisper-1",
  },
  env: {
    // // OpenAI API
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

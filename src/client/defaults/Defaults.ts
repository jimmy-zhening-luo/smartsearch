import path from "path";
import type { EnvConfig } from "./configs/EnvConfig.js";
import type { ConstConfig } from "./configs/ConstConfig.js";
import type {
  ConstSettingIds,
  ConstSettings,
  EnvSettingIds,
  EnvSettings,
} from "./ClientSettings.js";

export type {
  ConstSettingIds,
  ConstSettings,
  EnvSettingIds,
  EnvSettings,
};

const _INPUT = "input";
const _OUTPUT = "output";

export const constDefaults: ConstConfig<ConstSettingIds, ConstSettings> = {
  DEFAULT_INPUT_RELATIVE_PATH: _INPUT,
  DEFAULT_OUTPUT_RELATIVE_PATH: _OUTPUT,
  // // API Handlers
  // Chat
  DEFAULT_CHAT_MODEL: "gpt-4-1106-preview",
  // Speech
  DEFAULT_SPEECH_MODEL: "tts-1-hd",
  DEFAULT_SPEECH_VOICE: "alloy",
  DEFAULT_SPEECH_RESPONSE_FORMAT: "mp3",
  DEFAULT_SPEECH_SPEED: undefined,
};

export const envDefaults: EnvConfig<EnvSettingIds, EnvSettings> = {
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
};

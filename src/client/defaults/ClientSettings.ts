import type OpenAI from "openai";

// TODO: Create utility function to extract any string from OpenAI types
// TODO: Create utility function to extract string literals from OpenAI types

export type ConstSettingIds =
  // // Client Operations
  | "DEFAULT_INPUT_RELATIVE_PATH"
  | "DEFAULT_OUTPUT_RELATIVE_PATH"
  // // API Handlers
  // Chat
  | "DEFAULT_CHAT_MODEL"
  // Speech
  | "DEFAULT_SPEECH_MODEL"
  | "DEFAULT_SPEECH_VOICE"
  | "DEFAULT_SPEECH_RESPONSE_FORMAT"
  | "DEFAULT_TRANSLATE_MODEL"
  | "DEFAULT_TRANSCRIBE_MODEL";

export type EnvSettingIds =
  // // OpenAI API
  | "OPENAI_API_KEY"
  | "OPENAI_ORG_ID"
  // // Client Operations
  | "INPUT_DIRECTORY"
  | "OUTPUT_DIRECTORY";

export interface ConstSettings {
  // // Client Operations
  DEFAULT_INPUT_RELATIVE_PATH: string;
  DEFAULT_OUTPUT_RELATIVE_PATH: string;
  // // API Handlers
  // Chat
  DEFAULT_CHAT_MODEL: Extract<OpenAI.ChatCompletionCreateParamsNonStreaming["model"], string>;
  // Speech
  DEFAULT_SPEECH_MODEL: Extract<OpenAI.Audio.SpeechCreateParams["model"], string>;
  DEFAULT_SPEECH_VOICE: Extract<OpenAI.Audio.SpeechCreateParams["voice"], string>;
  DEFAULT_SPEECH_RESPONSE_FORMAT: Extract<OpenAI.Audio.SpeechCreateParams["response_format"], string>;
  DEFAULT_TRANSLATE_MODEL: Extract<OpenAI.Audio.TranslationCreateParams["model"], string>;
  DEFAULT_TRANSCRIBE_MODEL: Extract<OpenAI.Audio.TranscriptionCreateParams["model"], string>;
}

export interface EnvSettings {
  // // OpenAI API
  OPENAI_API_KEY: string | null;
  OPENAI_ORG_ID: string | null;
  // // Client Operations
  INPUT_DIRECTORY: string;
  OUTPUT_DIRECTORY: string;
}

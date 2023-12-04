// TODO: Require these to be string literals (type SettingIds)
export type ConstSettingIds =
  // // Client Operations
  | "DEFAULT_INPUT_RELATIVE_PATH"
  | "DEFAULT_OUTPUT_RELATIVE_PATH"
  // // API Handlers
  // Chat
  | "DEFAULT_CHAT_MODEL"
  | "DEFAULT_CHAT_JSON_MODEL"
  | "DEFAULT_CHAT_VISION_MODEL"
  // Image
  | "DEFAULT_IMAGE_MODEL"
  | "DEFAULT_IMAGE_COUNT"
  | "DEFAULT_IMAGE_QUALITY"
  | "DEFAULT_IMAGE_STYLE"
  | "DEFAULT_IMAGE_SHAPE"
  | "DEFAULT_IMAGE_LANDSCAPE_DIMENSIONS"
  | "DEFAULT_IMAGE_PORTRAIT_DIMENSIONS"
  | "DEFAULT_IMAGE_SQUARE_DIMENSIONS"
  | "DEFAULT_IMAGE_RESPONSE_FORMAT"
  // Reimage
  | "DEFAULT_REIMAGE_MODEL"
  | "DEFAULT_REIMAGE_COUNT"
  | "DEFAULT_REIMAGE_DIMENSIONS"
  | "DEFAULT_REIMAGE_RESPONSE_FORMAT"
  // Speech
  | "DEFAULT_SPEECH_MODEL"
  | "DEFAULT_SPEECH_VOICE"
  | "DEFAULT_SPEECH_RESPONSE_FORMAT"
  // Transcribe
  | "DEFAULT_TRANSCRIBE_MODEL"
  // Translate
  | "DEFAULT_TRANSLATE_MODEL";

export type EnvSettingIds =
  // // OpenAI API
  | "OPENAI_API_KEY"
  | "OPENAI_ORG_ID"
  // // Client Operations
  | "INPUT_DIRECTORY"
  | "OUTPUT_DIRECTORY";
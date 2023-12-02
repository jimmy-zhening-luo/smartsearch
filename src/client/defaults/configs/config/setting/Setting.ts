import type { SettingKeys } from "./keys/SettingKeys.js";

export type Setting<
  K extends string,
  AllowedValues,
> = {
  readonly [key in SettingKeys<K>]: AllowedValues;
};

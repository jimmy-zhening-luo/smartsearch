import type { SettingIds } from "./ids/SettingIds.js";

export type Settings<
  K extends string,
  V,
> = {
  readonly [key in SettingIds<K>]: V;
};

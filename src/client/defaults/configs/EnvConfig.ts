import type { Setting, Config } from "./config/Config.js";

// TODO: Disallow string literals
type _EnvV = string | undefined | null;

export type EnvSetting<K extends string> = Setting<K, _EnvV>;

export type EnvConfig<
  K extends string,
  P extends EnvSetting<K>,
> = Config<K, _EnvV, P>;

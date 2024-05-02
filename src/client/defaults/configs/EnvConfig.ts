import type { Settings } from "./config/Settings.js";
import type { Config } from "./config/Config.js";

// TODO: Disallow string literals
export type EnvSettings<K extends string> = Settings<K, string | undefined | null>;
export type EnvConfig<
  K extends string,
  P extends EnvSettings<K>,
> = Config<K, string | undefined | null, P>;

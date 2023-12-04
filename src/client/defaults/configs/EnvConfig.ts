import type { Settings } from "./config/Settings.js";
import type { Config } from "./config/Config.js";

// TODO: Disallow string literals
type _EnvV = string | undefined | null;

export type EnvSettings<K extends string> = Settings<K, _EnvV>;

export type EnvConfig<
  K extends string,
  P extends EnvSettings<K>,
> = Config<K, _EnvV, P>;

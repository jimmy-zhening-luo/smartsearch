import type { Settings } from "./config/Settings.js";
import type { Config } from "./config/Config.js";

export type ConstSettings<K extends string> = Settings<K, unknown>;
export type ConstConfig<
  K extends string,
  P extends ConstSettings<K>,
> = Config<K, unknown, P>;

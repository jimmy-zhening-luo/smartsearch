import type { Settings } from "./config/Settings.js";
import type { Config } from "./config/Config.js";

type _ConstV = any;

export type ConstSettings<K extends string> = Settings<K, _ConstV>;

export type ConstConfig<
  K extends string,
  P extends ConstSettings<K>,
> = Config<K, _ConstV, P>;

import type { Setting, Config } from "./config/Config.js";

type _ConstV = any;

export type ConstSetting<K extends string> = Setting<K, _ConstV>;

export type ConstConfig<
  K extends string,
  P extends ConstSetting<K>,
> = Config<K, _ConstV, P>;

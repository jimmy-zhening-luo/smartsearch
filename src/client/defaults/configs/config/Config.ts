import type { Settings } from "./Settings.js";

type _ExactMembers<
  Actual,
  Interface,
> = Actual extends Interface
  ? Exclude<keyof Actual, keyof Interface> extends never
    ? Actual
    : never
  : never;

export type Config<
  K extends string,
  V,
  P extends Settings<K, V>,
> = _ExactMembers<P, Settings<K, V>>;

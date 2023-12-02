import type { Setting } from "./setting/Setting.js";

export type { Setting };

type _StructuralType<
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
  P extends Setting<K, V>,
> = _StructuralType<P, Setting<K, V>>;

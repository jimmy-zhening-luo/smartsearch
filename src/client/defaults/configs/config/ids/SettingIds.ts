type _StringLiteral<S extends string> = string extends S
  ? never
  : S;

export type SettingIds<
  I extends string,
> = _StringLiteral<I>;

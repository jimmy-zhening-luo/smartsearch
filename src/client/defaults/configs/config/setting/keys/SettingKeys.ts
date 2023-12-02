type _StringLiteral<S extends string> = string extends S
  ? never
  : S;

export type SettingKeys<
  K extends string,
> = _StringLiteral<K>;

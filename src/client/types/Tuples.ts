namespace Tuples {
  export type Tuple<Type> = NTuple<Type, 2>;

  export type NTuple<Type, N extends number> = _TupleHelpers.BuildNTuple<
  [],
  Type,
  N
  >;

  export type MinTuple<Type, Min extends number> = _TupleHelpers.BuildMinTuple<
  [],
  Type,
  Min
  >;

  export type MaxTuple<
    Type,
    Max extends number,
  > = _TupleHelpers.BuildMinMaxTuple<[], Type, 0, Max>;

  export type MinMaxTuple<
    Type,
    Min extends number,
    Max extends number,
  > = _TupleHelpers.BuildMinMaxTuple<[], Type, Min, Max>;

  namespace _TupleHelpers {
    export type BuildNTuple<
      Current extends [...Type[]],
      Type,
      Count extends number,
    > = Current["length"] extends Count
      ? Current
      : BuildNTuple<[Type, ...Current], Type, Count>;

    export type BuildMinTuple<
      Current extends [...Type[]],
      Type,
      Min extends number,
    > = Current["length"] extends Min
      ? [...Current, ...Type[]]
      : BuildMinTuple<[Type, ...Current], Type, Min>;

    export type BuildMinMaxTuple<
      Current extends [...(Type | undefined)[]],
      Type,
      Min extends number,
      Max extends number,
      ExceedsMin extends boolean = false,
    > = ExceedsMin extends false
      ? Min extends Current["length"]
        ? BuildMinMaxTuple<Current, Type, Min, Max, true>
        : BuildMinMaxTuple<[...Current, Type], Type, Min, Max>
      : Max extends Current["length"]
        ? Current
        : BuildMinMaxTuple<[...Current, Type?], Type, Min, Max, true>;
  }

}

export default Tuples;

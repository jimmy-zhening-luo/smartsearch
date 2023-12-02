import dotenv from "dotenv";
import type { ConstSetting, ConstConfig } from "../configs/ConstConfig.js";
import type { EnvSetting, EnvConfig } from "../configs/EnvConfig.js";

export default abstract class SettingRuntime<
  CK extends string,
  C extends ConstSetting<CK>,
  EK extends string,
  E extends EnvSetting<EK>,
> {
  public readonly const: ConstConfig<CK, C>;
  public readonly env: EnvConfig<EK, E>;

  constructor(
    settings: {
      const: SettingRuntime<CK, C, EK, E>["const"];
      env: SettingRuntime<CK, C, EK, E>["env"];
    },
  ) {
    this.const = { ...settings.const };

    dotenv.config();
    this.env = { ...this.hydrateEnvConfig(settings.env) };
  }

  // TODO: Enforce all env settings are hydrated
  protected abstract hydrateEnvConfig(
    envConfig: EnvConfig<EK, E>
  ): EnvConfig<EK, E>;
}

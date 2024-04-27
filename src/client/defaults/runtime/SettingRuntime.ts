import dotenv from "dotenv";
import type {
  ConstSettings,
  ConstConfig,
} from "../configs/ConstConfig.js";
import type {
  EnvSettings,
  EnvConfig,
} from "../configs/EnvConfig.js";

export default abstract class SettingRuntime<
  CK extends string,
  C extends ConstSettings<CK>,
  EK extends string,
  E extends EnvSettings<EK>,
> {
  public readonly consts: ConstConfig<CK, C>;
  public readonly env: EnvConfig<EK, E>;

  constructor(
    settings: {
      consts: SettingRuntime<CK, C, EK, E>["consts"];
      env: SettingRuntime<CK, C, EK, E>["env"];
    },
  ) {
    this.consts = { ...settings.consts };
    dotenv.config();
    this.env = { ...this.hydrateEnvConfig(settings.env) };
  }

  // TODO: Enforce all env settings are hydrated
  protected abstract hydrateEnvConfig(
    envConfig: EnvConfig<EK, E>
  ): EnvConfig<EK, E>;
}

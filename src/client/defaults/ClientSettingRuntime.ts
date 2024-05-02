import SettingRuntime from "./runtime/SettingRuntime.js";
import { DefaultConfig } from "./DefaultConfig.js";
import type {
  ConstSettingIds,
  ConstSettings,
  EnvSettingIds,
  EnvSettings,
} from "./DefaultConfig.js";

export default class ClientSettingRuntime extends SettingRuntime<
  ConstSettingIds,
  ConstSettings,
  EnvSettingIds,
  EnvSettings
> {
  constructor(
    settings?:
      | ClientSettingRuntime
      | {
        consts: typeof ClientSettingRuntime.prototype.consts;
        env: typeof ClientSettingRuntime.prototype.env;
      },
  ) {
    super(
      settings ?? {
        consts: { ...DefaultConfig.consts },
        env: { ...DefaultConfig.env },
      },
    );
  }

  protected hydrateEnvConfig(
    c: typeof ClientSettingRuntime.prototype.env,
  ): typeof ClientSettingRuntime.prototype.env {
    return {
      ...c,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? c.OPENAI_API_KEY,
      OPENAI_ORG_ID: process.env.OPENAI_ORG_ID ?? c.OPENAI_ORG_ID,
      INPUT_DIRECTORY: process.env.INPUT_DIRECTORY ?? c.INPUT_DIRECTORY,
      OUTPUT_DIRECTORY: process.env.OUTPUT_DIRECTORY ?? c.OUTPUT_DIRECTORY,
    };
  }
}

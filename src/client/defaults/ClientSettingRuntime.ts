import SettingRuntime from "./runtime/SettingRuntime.js";
import { constDefaults, envDefaults } from "./Defaults.js";
import type {
  ConstSettingIds,
  ConstSettings,
  EnvSettingIds,
  EnvSettings,
} from "./Defaults.js";

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

      const: typeof ClientSettingRuntime.prototype.const;
      env: typeof ClientSettingRuntime.prototype.env;
    },
  ) {
    super(
      settings ?? {
        "const": constDefaults,
        env: envDefaults,
      },
    );
  }

  protected hydrateEnvConfig(
    c: typeof ClientSettingRuntime.prototype.env,
  ): typeof ClientSettingRuntime.prototype.env {
    c.OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? c.OPENAI_API_KEY;
    c.OPENAI_ORG_ID = process.env.OPENAI_ORG_ID ?? c.OPENAI_ORG_ID;
    c.INPUT_DIRECTORY = process.env.INPUT_DIRECTORY ?? c.INPUT_DIRECTORY;
    c.OUTPUT_DIRECTORY = process.env.OUTPUT_DIRECTORY ?? c.OUTPUT_DIRECTORY;
    c.DEFAULT_INPUT_RELATIVE_PATH = process.env
      .DEFAULT_INPUT_RELATIVE_PATH ?? c.DEFAULT_INPUT_RELATIVE_PATH;
    c.DEFAULT_OUTPUT_RELATIVE_PATH = process.env
      .DEFAULT_OUTPUT_RELATIVE_PATH ?? c.DEFAULT_OUTPUT_RELATIVE_PATH;

    return c;
  }
}

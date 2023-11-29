import type ISettings from "./ISettings.js";

export default class Config<S extends ISettings> {
  readonly settings: S;

  constructor(settings: S | Config<S>) {
    try {
      this.settings = settings instanceof Config
        ? { ...settings.settings }
        : { ...settings };
    }
    catch (e) {
      throw new EvalError(
        `Config: Failed to instantiate base Config`,
        { cause: e },
      );
    }
  }

  protected static getEnv(key: keyof ISettings): string | undefined {
    try {
      return process.env[String(key)];
    }
    catch (e) {
      throw new EvalError(
        `Config: getEnv: Failed to get environment variable ${String(key)}`,
        { cause: e },
      );
    }
  }

  protected static getEnvCoerce<
    S extends ISettings,
    T,
  >(
    key: keyof S,
  ):
    T | undefined {
    try {
      const value: T | undefined = process.env[String(key)] as T | undefined;

      if (value === undefined) {
        return undefined;
      }
      else {
        return value;
      }
    }
    catch (e) {
      throw new EvalError(
        `Config: getEnvCoerce: Failed to get environment variable ${String(key)}`,
        { cause: e },
      );
    }
  }
}

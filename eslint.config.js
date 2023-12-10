// v5.2.0

// PLUGINS
import stylisticPlugin from "@stylistic/eslint-plugin";
import jsLintPlugin from "@eslint/js";
import tsLintPlugin from "@typescript-eslint/eslint-plugin";
import tsLintParser from "@typescript-eslint/parser";
import JimboLint from "@jimbojet/lint";

const JimboLintConfigs = new JimboLint(
  stylisticPlugin,
  jsLintPlugin,
  tsLintPlugin,
  tsLintParser,
  ["eslint.config.js"],
  [
    "src/**/*.ts",
    "src/**/*.cts",
    "src/**/*.mts",
  ],
);

export default [
  ...JimboLintConfigs.configs,
];

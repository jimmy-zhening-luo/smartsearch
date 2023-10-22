import tsLint from "@typescript-eslint/eslint-plugin";
import tsLintParser from "@typescript-eslint/parser";
import esLintConfigPrettier from "eslint-config-prettier";

export default [
  esLintConfigPrettier,
  {
    files: ["src/**/*.ts"],
    ignores: [
      "dist/"
    ],
    plugins: {
       tsLint: tsLint,
    },
    languageOptions:{
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsLintParser,
      parserOptions: {
        ecmaVersion: "es2022",
        sourceType: "module",
        project: true
            },
    },
    rules: {
      "tsLint/await-thenable": "error",
      "tsLint/ban-ts-comment": "error",
      "tsLint/ban-types": "error",
      "tsLint/consistent-generic-constructors": [
        "error",
        "type-annotation",
      ],
      "tsLint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],
      "tsLint/explicit-function-return-type": "error",
      "tsLint/no-base-to-string": "error",
      "tsLint/no-confusing-non-null-assertion": "error",
      "tsLint/no-confusing-void-expression": "error",
      "tsLint/no-duplicate-enum-values": "error",
      "tsLint/no-empty-interface": "error",
      "tsLint/no-extra-non-null-assertion": "error",
      "tsLint/no-for-in-array": "error",
      "tsLint/no-invalid-void-type": "error",
      "tsLint/no-meaningless-void-operator": "error",
      "tsLint/no-misused-new": "error",
      "tsLint/no-mixed-enums": "error",
      "tsLint/no-non-null-asserted-nullish-coalescing": "error",
      "tsLint/no-non-null-asserted-optional-chain": "error",
      "tsLint/no-require-imports": "error",
      "tsLint/no-this-alias": "error",
      "tsLint/no-unnecessary-condition": "error",
      "tsLint/no-unnecessary-type-arguments": "error",
      "tsLint/no-unnecessary-type-assertion": "error",
      "tsLint/no-unnecessary-type-constraint": "error",
      "tsLint/no-unsafe-call": "error",
      "tsLint/no-unsafe-declaration-merging": "error",
      "tsLint/no-unsafe-member-access": "error",
      "tsLint/no-useless-empty-export": "error",
      "tsLint/no-var-requires": "error",
      "tsLint/non-nullable-type-assertion-style": "error",
      "tsLint/prefer-as-const": "error",
      "tsLint/prefer-for-of": "error",
      "tsLint/prefer-function-type": "error",
      "tsLint/prefer-includes": "error",
      "tsLint/prefer-literal-enum-member": "error",
      "tsLint/prefer-namespace-keyword": "error",
      "tsLint/prefer-readonly": "error",
      "tsLint/prefer-return-this-type": "error",
      "tsLint/prefer-string-starts-ends-with": "error",
      "tsLint/prefer-ts-expect-error": "error",
      "tsLint/restrict-plus-operands": "error",
      "tsLint/strict-boolean-expressions": "error",
      "tsLint/switch-exhaustiveness-check": "error",
      "tsLint/unified-signatures": "error",
    },
  }
];

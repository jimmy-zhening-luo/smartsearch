// v5.2.0

// PLUGINS
import jsLint from "@eslint/js";
import tsLint from "@typescript-eslint/eslint-plugin";
import tsLintParser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";

// STATES
// Severity
const ERROR = "error";
const OFF = "off";

// Options
const ALWAYS = "always";
const NEVER = "never";
const ANY = "any";
const EXPLICIT = "explicit";
const CONSISTENT = "consistent";
const AS_NEEDED = "as-needed";
const NO_PUBLIC = "no-public";
const ALL_STAR = "*";

// SETTINGS
const LinterSettings = {
  files: {
    js: ["eslint.config.js"],
    ts: ["src/**/*.ts"],
  },
  processor: {
    base: {
      linterOptions: {
        noInlineConfig: true,
        reportUnusedDisableDirectives: true,
      },
      plugins: {
        "@eslint/js": jsLint,
        "@typescript-eslint": tsLint,
        "@stylistic": stylistic,
      },
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        parser: tsLintParser,
        parserOptions: {
          ecmaVersion: "es2022",
          sourceType: "module",
          project: true,
        },
      },
    },
  },
};

const LinterConfig = {
  js: {
    ...LinterSettings.processor.base,
    files: LinterSettings.files.js,
  },
  ts: {
    ...LinterSettings.processor.base,
    files: LinterSettings.files.ts,
  },
};

// Rules
const RuleSet = {
  base: {
    recommended: {
      js: {
        ...jsLint.configs.recommended.rules,
      },
      ts: {
        ...tsLint.configs["eslint-recommended"].rules,
      },
    },
    disable: {
      js: {
        ...stylistic.configs["disable-legacy"].rules,
      },
      ts: {
        "arrow-body-style": OFF,
        "prefer-arrow-callback": OFF,
        ...stylistic.configs["disable-legacy"].rules,
        // Placeholder: ESLint override disables
      },
    },
  },
  custom: {
    functional: {
      js: {},
      ts: {
        extensions: {
          // TS-specific of ESLint rules originally written for JS:
          // https://typescript-eslint.io/rules/?=extension-xformatting-xdeprecated#rules
          disableJs: {
            "init-declarations": OFF,
            "no-array-constructor": OFF,
            "no-implied-eval": OFF,
            "no-loop-func": OFF,
            "no-loss-of-precision": OFF,
            "no-magic-numbers": OFF,
            "no-throw-literal": OFF,
            "no-unused-expressions": OFF,
            "no-unused-vars": OFF,
            "no-useless-constructor": OFF,
            "require-await": OFF,
            "return-await": OFF,
          },
          enableTs: {
            // Maybe: https://typescript-eslint.io/rules/class-methods-use-this/
            "@typescript-eslint/init-declarations": ERROR,
            "@typescript-eslint/no-array-constructor": ERROR,
            "@typescript-eslint/no-implied-eval": ERROR,
            "@typescript-eslint/no-loop-func": ERROR,
            "@typescript-eslint/no-loss-of-precision": ERROR,
            "@typescript-eslint/no-magic-numbers": [
              ERROR,
              {
                ignore: [
                  -1,
                  0,
                  1,
                  2,
                ],
                ignoreArrayIndexes: true,
                ignoreDefaultValues: false,
                ignoreClassFieldInitialValues: false,
                enforceConst: true,
                detectObjects: false,
                ignoreEnums: false,
                ignoreNumericLiteralTypes: true,
                ignoreReadonlyClassProperties: true,
                ignoreTypeIndexes: true,
              },
            ],
            "@typescript-eslint/no-throw-literal": ERROR,
            "@typescript-eslint/no-unused-expressions": [
              ERROR,
              {
                allowShortCircuit: true,
                allowTernary: true,
              },
            ],
            "@typescript-eslint/no-unused-vars": ERROR,
            "@typescript-eslint/no-useless-constructor": ERROR,
            "@typescript-eslint/require-await": ERROR,
            "@typescript-eslint/return-await": [
              ERROR,
              "in-try-catch",
            ],
          },
        },
        unique: {
          // TS-only rules:
          // https://typescript-eslint.io/rules/?=xextension-xformatting-xdeprecated#rules
          "@typescript-eslint/adjacent-overload-signatures": ERROR,
          "@typescript-eslint/array-type": [
            ERROR,
            {
              "default": "array-simple",
              readonly: "array-simple",
            },
          ],
          "@typescript-eslint/await-thenable": ERROR,
          "@typescript-eslint/ban-ts-comment": ERROR,
          "@typescript-eslint/ban-tslint-comment": ERROR,
          "@typescript-eslint/ban-types": ERROR,
          "@typescript-eslint/class-literal-property-style": ERROR,
          "@typescript-eslint/consistent-generic-constructors": [
            ERROR,
            "type-annotation",
          ],
          "@typescript-eslint/consistent-type-assertions": [
            ERROR,
            {
              assertionStyle: "as",
              objectLiteralTypeAssertions: NEVER,
            },
          ],
          "@typescript-eslint/consistent-type-exports": ERROR,
          "@typescript-eslint/consistent-type-imports": ERROR,
          "@typescript-eslint/explicit-function-return-type": ERROR,
          "@typescript-eslint/explicit-member-accessibility": [
            ERROR,
            {
              accessibility: EXPLICIT,
              overrides: {
                properties: EXPLICIT,
                constructors: NO_PUBLIC,
                accessors: EXPLICIT,
                methods: EXPLICIT,
                parameterProperties: OFF,
              },
            },
          ],
          "@typescript-eslint/explicit-module-boundary-types": [
            ERROR,
            {
              allowArgumentsExplicitlyTypedAsAny: false,
              allowDirectConstAssertionInArrowFunctions: false,
              allowedNames: [],
              allowHigherOrderFunctions: false,
              allowTypedFunctionExpressions: false,
            },
          ],
          "@typescript-eslint/member-ordering": [
            ERROR,
            {
              "default": {
                memberTypes: [
                  // Index signature
                  "signature",
                  "call-signature",

                  // Fields
                  "public-static-field",
                  "protected-static-field",
                  "private-static-field",
                  "#private-static-field",

                  "public-decorated-field",
                  "protected-decorated-field",
                  "private-decorated-field",

                  "public-instance-field",
                  "protected-instance-field",
                  "private-instance-field",
                  "#private-instance-field",

                  "public-abstract-field",
                  "protected-abstract-field",

                  "public-field",
                  "protected-field",
                  "private-field",
                  "#private-field",

                  "static-field",
                  "instance-field",
                  "abstract-field",

                  "decorated-field",

                  "field",

                  // Static initialization
                  "static-initialization",

                  // Constructors
                  "public-constructor",
                  "protected-constructor",
                  "private-constructor",

                  "constructor",

                  // Accessors
                  "public-static-accessor",
                  "protected-static-accessor",
                  "private-static-accessor",
                  "#private-static-accessor",

                  "public-decorated-accessor",
                  "protected-decorated-accessor",
                  "private-decorated-accessor",

                  "public-instance-accessor",
                  "protected-instance-accessor",
                  "private-instance-accessor",
                  "#private-instance-accessor",

                  "public-abstract-accessor",
                  "protected-abstract-accessor",

                  "public-accessor",
                  "protected-accessor",
                  "private-accessor",
                  "#private-accessor",

                  "static-accessor",
                  "instance-accessor",
                  "abstract-accessor",

                  "decorated-accessor",

                  "accessor",

                  // Getters
                  "public-static-get",
                  "protected-static-get",
                  "private-static-get",
                  "#private-static-get",

                  "public-decorated-get",
                  "protected-decorated-get",
                  "private-decorated-get",

                  "public-instance-get",
                  "protected-instance-get",
                  "private-instance-get",
                  "#private-instance-get",

                  "public-abstract-get",
                  "protected-abstract-get",

                  "public-get",
                  "protected-get",
                  "private-get",
                  "#private-get",

                  "static-get",
                  "instance-get",
                  "abstract-get",

                  "decorated-get",

                  "get",

                  // Setters
                  "public-static-set",
                  "protected-static-set",
                  "private-static-set",
                  "#private-static-set",

                  "public-decorated-set",
                  "protected-decorated-set",
                  "private-decorated-set",

                  "public-instance-set",
                  "protected-instance-set",
                  "private-instance-set",
                  "#private-instance-set",

                  "public-abstract-set",
                  "protected-abstract-set",

                  "public-set",
                  "protected-set",
                  "private-set",
                  "#private-set",

                  "static-set",
                  "instance-set",
                  "abstract-set",

                  "decorated-set",

                  "set",

                  // Methods
                  "public-static-method",
                  "protected-static-method",
                  "private-static-method",
                  "#private-static-method",

                  "public-decorated-method",
                  "protected-decorated-method",
                  "private-decorated-method",

                  "public-instance-method",
                  "protected-instance-method",
                  "private-instance-method",
                  "#private-instance-method",

                  "public-abstract-method",
                  "protected-abstract-method",

                  "public-method",
                  "protected-method",
                  "private-method",
                  "#private-method",

                  "static-method",
                  "instance-method",
                  "abstract-method",

                  "decorated-method",

                  "method",
                ],
                optionalityOrder: "required-first",
                order: "as-written",
              },

            },
          ],
          "@typescript-eslint/method-signature-style": ERROR,
          // TODO: @typescript-eslint/naming-convention
          "@typescript-eslint/no-base-to-string": ERROR,
          "@typescript-eslint/no-confusing-non-null-assertion": ERROR,
          "@typescript-eslint/no-confusing-void-expression": ERROR,
          "@typescript-eslint/no-duplicate-enum-values": ERROR,
          "@typescript-eslint/no-duplicate-type-constituents": ERROR,
          "@typescript-eslint/no-dynamic-delete": ERROR,
          "@typescript-eslint/no-empty-interface": ERROR,
          "@typescript-eslint/no-extra-non-null-assertion": ERROR,
          "@typescript-eslint/no-floating-promises": ERROR,
          "@typescript-eslint/no-for-in-array": ERROR,
          "@typescript-eslint/no-import-type-side-effects": ERROR,
          "@typescript-eslint/no-invalid-void-type": ERROR,
          "@typescript-eslint/no-meaningless-void-operator": ERROR,
          "@typescript-eslint/no-misused-new": ERROR,
          "@typescript-eslint/no-misused-promises": ERROR,
          "@typescript-eslint/no-mixed-enums": ERROR,
          "@typescript-eslint/no-non-null-asserted-nullish-coalescing": ERROR,
          "@typescript-eslint/no-non-null-asserted-optional-chain": ERROR,
          "@typescript-eslint/no-redundant-type-constituents": ERROR,
          "@typescript-eslint/no-require-imports": ERROR,
          "@typescript-eslint/no-this-alias": ERROR,
          "@typescript-eslint/no-unnecessary-boolean-literal-compare": ERROR,
          "@typescript-eslint/no-unnecessary-condition": ERROR,
          "@typescript-eslint/no-unnecessary-qualifier": ERROR,
          "@typescript-eslint/no-unnecessary-type-arguments": ERROR,
          "@typescript-eslint/no-unnecessary-type-assertion": ERROR,
          "@typescript-eslint/no-unnecessary-type-constraint": ERROR,
          "@typescript-eslint/no-unsafe-argument": ERROR,
          "@typescript-eslint/no-unsafe-assignment": ERROR,
          "@typescript-eslint/no-unsafe-call": ERROR,
          "@typescript-eslint/no-unsafe-declaration-merging": ERROR,
          "@typescript-eslint/no-unsafe-enum-comparison": ERROR,
          "@typescript-eslint/no-unsafe-member-access": ERROR,
          "@typescript-eslint/no-unsafe-return": ERROR,
          "@typescript-eslint/no-unsafe-unary-minus": ERROR,
          "@typescript-eslint/no-useless-empty-export": ERROR,
          "@typescript-eslint/no-var-requires": ERROR,
          "@typescript-eslint/non-nullable-type-assertion-style": ERROR,
          "@typescript-eslint/parameter-properties": ERROR,
          "@typescript-eslint/prefer-as-const": ERROR,
          "@typescript-eslint/prefer-for-of": ERROR,
          "@typescript-eslint/prefer-function-type": ERROR,
          "@typescript-eslint/prefer-includes": ERROR,
          "@typescript-eslint/prefer-literal-enum-member": ERROR,
          "@typescript-eslint/prefer-namespace-keyword": ERROR,
          "@typescript-eslint/prefer-nullish-coalescing": ERROR,
          "@typescript-eslint/prefer-optional-chain": ERROR,
          "@typescript-eslint/prefer-readonly": ERROR,
          // maybe: prefer-readonly-parameter-types
          "@typescript-eslint/prefer-reduce-type-parameter": ERROR,
          "@typescript-eslint/prefer-regexp-exec": ERROR,
          "@typescript-eslint/prefer-return-this-type": ERROR,
          "@typescript-eslint/prefer-string-starts-ends-with": ERROR,
          "@typescript-eslint/prefer-ts-expect-error": ERROR,
          "@typescript-eslint/promise-function-async": ERROR,
          "@typescript-eslint/require-array-sort-compare": ERROR,
          "@typescript-eslint/restrict-plus-operands": ERROR,
          "@typescript-eslint/restrict-template-expressions": ERROR,
          "@typescript-eslint/strict-boolean-expressions": ERROR,
          "@typescript-eslint/switch-exhaustiveness-check": ERROR,
          "@typescript-eslint/triple-slash-reference": ERROR,
          "@typescript-eslint/unbound-method": ERROR,
        },
      },
    },
    stylistic: {
      jsTs: {
        // JavaScript rules
        "@stylistic/array-bracket-newline": [
          ERROR,
          CONSISTENT,
        ],
        "@stylistic/array-bracket-spacing": [
          ERROR,
          ALWAYS,
          {
            singleValue: false,
            objectsInArrays: false,
            arraysInArrays: false,
          },
        ],
        "@stylistic/array-element-newline": [
          ERROR,
          CONSISTENT,
        ],
        "@stylistic/arrow-parens": [
          ERROR,
          AS_NEEDED,
        ],
        "@stylistic/arrow-spacing": ERROR,
        "@stylistic/block-spacing": ERROR,
        "@stylistic/brace-style": [
          ERROR,
          "stroustrup",
          {
            allowSingleLine: true,
          },
        ],
        "@stylistic/comma-dangle": [
          ERROR,
          "always-multiline",
        ],
        "@stylistic/comma-spacing": ERROR,
        "@stylistic/comma-style": [
          ERROR,
          "last",
          {
            exceptions: {},
          },
        ],
        "@stylistic/computed-property-spacing": [
          ERROR,
          NEVER,
          {
            enforceForClassMembers: true,
          },
        ],
        "@stylistic/dot-location": [
          ERROR,
          "property",
        ],
        "@stylistic/eol-last": ERROR,
        "@stylistic/function-call-argument-newline": [
          ERROR,
          CONSISTENT,
        ],
        "@stylistic/function-call-spacing": ERROR,
        "@stylistic/function-paren-newline": [
          ERROR,
          "multiline-arguments",
        ],
        "@stylistic/generator-star-spacing": [
          ERROR,
          {
            before: true,
            after: false,
          },
        ],
        // https://eslint.style/rules/default/indent
        "@stylistic/indent": [
          ERROR,
          2,
          {
            flatTernaryExpressions: false,
            offsetTernaryExpressions: true,
          },
        ],
        "@stylistic/key-spacing": [
          ERROR,
          {
            beforeColon: false,
            afterColon: true,
            mode: "strict",
          },
        ],
        "@stylistic/keyword-spacing": [
          ERROR,
          {
            before: true,
            after: true,
            overrides: {},
          },
        ],
        "@stylistic/lines-around-comment": [
          ERROR,
          {
            beforeBlockComment: true,
            afterBlockComment: false,
            beforeLineComment: false,
            afterLineComment: false,
            allowBlockStart: true,
            allowBlockEnd: true,
            allowObjectStart: true,
            allowObjectEnd: true,
            allowArrayStart: true,
            allowArrayEnd: true,
            allowClassStart: true,
            allowClassEnd: true,
            applyDefaultIgnorePatterns: true,
          },
        ],
        "@stylistic/lines-between-class-members": [
          ERROR,
          {
            enforce: [
              {
                blankLine: NEVER,
                prev: "field",
                next: "field",
              },
              {
                blankLine: ALWAYS,
                prev: "field",
                next: "method",
              },
              {
                blankLine: ALWAYS,
                prev: "method",
                next: ALL_STAR,
              },
            ],
          },
          {
            exceptAfterSingleLine: false,
          },
        ],
        "@stylistic/max-len": [
          ERROR,
          {
            code: 80,
            tabWidth: 2,
            ignoreComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,

          },
        ],
        "@stylistic/max-statements-per-line": [
          ERROR,
          {
            max: 1,
          },
        ],
        "@stylistic/multiline-ternary": [
          ERROR,
          ALWAYS,
        ],
        "@stylistic/new-parens": [
          ERROR,
          ALWAYS,
        ],
        "@stylistic/newline-per-chained-call": [
          ERROR,
          {
            ignoreChainWithDepth: 1,
          },
        ],
        "@stylistic/no-extra-parens": ERROR,
        "@stylistic/no-extra-semi": ERROR,
        "@stylistic/no-floating-decimal": ERROR,
        "@stylistic/no-mixed-spaces-and-tabs": ERROR,
        "@stylistic/no-multi-spaces": ERROR,
        "@stylistic/no-multiple-empty-lines": [
          ERROR,
          {
            max: 1,
            maxEOF: 1,
            maxBOF: 0,
          },
        ],
        "@stylistic/no-trailing-spaces": [
          ERROR,
          {
            skipBlankLines: false,
            ignoreComments: false,
          },
        ],
        "@stylistic/no-whitespace-before-property": ERROR,
        "@stylistic/nonblock-statement-body-position": [
          ERROR,
          ANY,
        ],
        "@stylistic/object-curly-newline": [
          ERROR,
          {
            ObjectExpression: {
              multiline: true,
              minProperties: 2,
              consistent: true,
            },
            ObjectPattern: {
              multiline: true,
              minProperties: 2,
              consistent: true,
            },
            ImportDeclaration: {
              multiline: true,
              minProperties: 3,
              consistent: true,
            },
            ExportDeclaration: {
              multiline: true,
              minProperties: 3,
              consistent: true,
            },
          },
        ],
        "@stylistic/object-curly-spacing": [
          ERROR,
          ALWAYS,
          {
            arraysInObjects: true,
            objectsInObjects: true,
          },
        ],
        "@stylistic/object-property-newline": [
          ERROR,
          {
            allowAllPropertiesOnSameLine: false,
          },
        ],
        "@stylistic/operator-linebreak": [
          ERROR,
          "before",
        ],
        "@stylistic/padded-blocks": [
          ERROR,
          NEVER,
          {
            allowSingleLineBlocks: true,
          },
        ],
        // https://eslint.style/rules/default/padding-line-between-statements
        "@stylistic/padding-line-between-statements": [
          ERROR,
          {
            blankLine: ALWAYS,
            prev: [
              "class",
              "for",
              "while",
              "try",
              "block",
            ],
            next: ALL_STAR,
          },
          {
            blankLine: ALWAYS,
            prev: ALL_STAR,
            next: [
              "return",
              "break",
              "continue",
            ],
          },
          {
            blankLine: ALWAYS,
            prev: [
              "const",
              "let",
              "var",
            ],
            next: ALL_STAR,
          },
          {
            blankLine: ANY,
            prev: [
              "const",
              "let",
              "var",
            ],
            next: [
              "const",
              "let",
              "var",
            ],
          },
          {
            blankLine: ALWAYS,
            prev: ["import"],
            next: ALL_STAR,
          },
          {
            blankLine: ANY,
            prev: ["import"],
            next: ["import"],
          },
          {
            blankLine: ALWAYS,
            prev: ALL_STAR,
            next: ["export"],
          },
          {
            blankLine: ANY,
            prev: ["export"],
            next: ["export"],
          },
          {
            blankLine: ALWAYS,
            prev: "directive",
            next: ALL_STAR,
          },
          {
            blankLine: ANY,
            prev: "directive",
            next: "directive",
          },
        ],
        "@stylistic/quote-props": [
          ERROR,
          AS_NEEDED,
          {
            keywords: true,
            unnecessary: true,
            numbers: false,
          },
        ],
        "@stylistic/quotes": [
          ERROR,
          "double",
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        "@stylistic/rest-spread-spacing": [
          ERROR,
          NEVER,
        ],
        "@stylistic/semi": [
          ERROR,
          ALWAYS,
          {
            omitLastInOneLineBlock: false,
            omitLastInOneLineClassBody: false,
          },
        ],
        "@stylistic/semi-spacing": ERROR,
        "@stylistic/semi-style": ERROR,
        "@stylistic/space-before-blocks": ERROR,
        "@stylistic/space-before-function-paren": [
          ERROR,
          {
            anonymous: ALWAYS,
            named: NEVER,
            asyncArrow: ALWAYS,
          },
        ],
        "@stylistic/space-in-parens": ERROR,
        "@stylistic/space-infix-ops": [
          ERROR,
          {
            int32Hint: true,
          },
        ],
        "@stylistic/space-unary-ops": [
          ERROR,
          {
            words: true,
            nonwords: false,
            overrides: {},
          },
        ],
        "@stylistic/spaced-comment": [
          ERROR,
          ALWAYS,
        ],
        "@stylistic/switch-colon-spacing": ERROR,
        "@stylistic/template-tag-spacing": [
          ERROR,
          ALWAYS,
        ],
        "@stylistic/wrap-iife": [
          ERROR,
          "inside",
          {
            functionPrototypeMethods: true,
          },
        ],
        "@stylistic/wrap-regex": ERROR,
        "@stylistic/yield-star-spacing": ERROR,

      },
      tsOnly: {
        "@stylistic/member-delimiter-style": ERROR,
        "@stylistic/type-annotation-spacing": ERROR,
      },
    },
  },
};

// ESLint flat config
// An array of configs merged from bottom up (last rule wins)
// https://eslint.org/docs/latest/use/configure/configuration-files-new
export default [
  // JS
  {
    ...LinterConfig.js,
    rules: RuleSet.base.recommended.js,
  },
  {
    ...LinterConfig.js,
    rules: RuleSet.base.disable.js,
  },
  {
    ...LinterConfig.js,
    rules: RuleSet.custom.functional.js,
  },
  {
    ...LinterConfig.js,
    rules: RuleSet.custom.stylistic.jsTs,
  },
  {
    ...LinterConfig.ts,
    rules: RuleSet.base.recommended.ts,
  },
  {
    ...LinterConfig.ts,
    rules: RuleSet.base.disable.ts,
  },
  {
    ...LinterConfig.ts,
    rules: {
      ...RuleSet.custom.functional.ts.extensions.disableJs,
      ...RuleSet.custom.functional.ts.extensions.enableTs,
      ...RuleSet.custom.functional.ts.unique,
    },
  },
  {
    ...LinterConfig.ts,
    rules: {
      ...RuleSet.custom.stylistic.jsTs,
      ...RuleSet.custom.stylistic.tsOnly,
    },
  },
];

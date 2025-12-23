const {
  defineConfig,
  globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const vue = require("eslint-plugin-vue");
const js = require("@eslint/js");

const {
  FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([{
  languageOptions: {
    parserOptions: {
      parser: require.resolve("@typescript-eslint/parser"),
      extraFileExtensions: [".vue"],
    },

    globals: {
      ...globals.browser,
      ...globals.node,
      ga: "readonly",
      cordova: "readonly",
      __statics: "readonly",
      __QUASAR_SSR__: "readonly",
      __QUASAR_SSR_SERVER__: "readonly",
      __QUASAR_SSR_CLIENT__: "readonly",
      __QUASAR_SSR_PWA__: "readonly",
      process: "readonly",
      chrome: "readonly",
    },
  },

  extends: compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "prettier",
  ),

  plugins: {
    "@typescript-eslint": typescriptEslint,
    vue,
  },

  rules: {
    "prefer-promise-reject-errors": "off",

    quotes: ["warn", "single", {
      avoidEscape: true,
    }],

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
}, globalIgnores([
  "dist",
  "src-cordova",
  ".quasar",
  "node_modules",
  "**/.eslintrc.cjs",
  "quasar.config.*.temporary.compiled*",
])]);

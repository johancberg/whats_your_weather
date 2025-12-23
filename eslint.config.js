import {
  defineConfig,
  globalIgnores,
} from "eslint/config";

import globals from "globals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import vue from "eslint-plugin-vue";
import js from "@eslint/js";
import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  languageOptions: {
    parserOptions: {
      parser: await import("@typescript-eslint/parser"),
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

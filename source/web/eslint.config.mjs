import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.amd,
        ...jestPlugin.environments.globals.globals,
        page: "readonly",
        browser: "readonly",
      },
    },
  },
  {
    ignores: ["test/*", "tests/*", "specs/*"],
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/valid-expect": "error",
    },
  },
];

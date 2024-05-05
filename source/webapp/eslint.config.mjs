import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  ignorePatterns: ["test/"], // Ignore all files within the test directory
  languageOptions: {
    globals: globals.browser
  },
  extends: [
    pluginJs.configs.recommended
  ],
};

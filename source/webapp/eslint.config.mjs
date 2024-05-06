import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["test/*"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.amd,
      },
    },
  },
  pluginJs.configs.recommended,
];

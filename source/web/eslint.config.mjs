import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.amd,
      },
    },
  },
  { ignores: ["test/*", "tests/*", "specs/*"] },
  pluginJs.configs.recommended,
];

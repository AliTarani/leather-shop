import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vite.dev/config/
const cherryPickedKeys = [
  "REACT_APP_APP_NAME",
  "REACT_APP_ENV",
  "REACT_APP_API_URL",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));
  return {
    define: {
      "process.env": processEnv,
    },
    resolve: {
      alias: [
        { find: "@core", replacement: path.resolve(__dirname, "src/core") },
      ],
    },
    plugins: [react()],
  };
});

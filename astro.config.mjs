import { defineConfig } from "astro/config";
import mkcert from "vite-plugin-mkcert";
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";
const { STORYBLOK_LOCAL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const isLocal = STORYBLOK_LOCAL === "yes";
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  ...(isLocal && {
    vite: {
      server: {
        https: true,
      },
      plugins: [mkcert()],
    },
  }),
});

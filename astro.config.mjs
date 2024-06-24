import { defineConfig } from "astro/config";
import mkcert from "vite-plugin-mkcert";
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";
import storyblok from "@storyblok/astro";
import vercel from "@astrojs/vercel/serverless";
const { RUNNING_LOCALLY, STORYBLOK_ACESS_TOKEN, STORYBLOK_IS_PREVIEW } =
  loadEnv(process.env.NODE_ENV, process.cwd(), "");
const isLocal = RUNNING_LOCALLY === "yes";
const isPreview = STORYBLOK_IS_PREVIEW === "yes";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    storyblok({
      accessToken: STORYBLOK_ACESS_TOKEN,
      livePreview: isPreview,
      enableFallbackComponent: isPreview,
      components: {
        default_page: "storyblok/DefaultPage",
        hero_section: "storyblok/HeroSection",
        text_image_section: "storyblok/TextImageSection",
      },
    }),
  ],
  ...(isLocal && {
    vite: {
      server: {
        https: true,
      },
      plugins: [mkcert()],
    },
  }),
  output: "server",

  adapter: vercel(
    isPreview
      ? {}
      : {
          isr: {
            expiration: 60,
          },
        }
  ),
});

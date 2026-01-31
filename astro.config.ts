import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // used to generate images
  site: "https://zacharyleong.com",
  trailingSlash: 'ignore',
  integrations: [sitemap(), UnoCSS({ injectReset: true }), mdx()],
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});
;
;

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import netlify from '@astrojs/netlify';
import decapCmsOauth from 'astro-decap-cms-oauth';

export default defineConfig({
  integrations: [tailwind(), mdx(), decapCmsOauth()],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    syntaxHighlight: 'shiki',
    output: 'server',
    adapter: netlify(),
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },

  vite: {
    define: {
      'import.meta.env.GITHUB_TOKEN': JSON.stringify(process.env.GITHUB_TOKEN)
    },
    // build: {
    //   assetsInlineLimit: 0,
    //   rollupOptions: {
    //     output: {
    //       entryFileNames: 'assets/[name].[hash].js',
    //       chunkFileNames: 'assets/[name].[hash].js',
    //       assetFileNames: 'assets/[name].[hash][extname]',
    //     }
    //   }
    // }
  },

  adapter: netlify()
});
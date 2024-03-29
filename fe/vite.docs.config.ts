import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';
import rehypeMathJaxSvg from 'rehype-mathjax/svg';
import rehypeMermaid from 'rehype-mermaid';

import rehypePrism from 'rehype-prism-plus/all';
import remarkGfm from 'remark-gfm';
import remarkInlineLinks from 'remark-inline-links';
import remarkMath from 'remark-math';
import { defineConfig, PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      s: {
        app: './docs.html',
      },
    },
  },

  server: {
    port: 5050,
    strictPort: true,
  },

  plugins: [
    // consider docs.html as the root path
    {
      name: 'docs-index',
      configureServer(server) {
        server.middlewares.use((req, _, next) => {
          if (req.url === '/') {
            req.url = '/docs.html';
          }
          next();
        });
      },
    },

    // config MDX
    {
      ...mdx({
        mdxExtensions: ['.mdx', '.md'],
        remarkPlugins: [remarkGfm, remarkMath, remarkInlineLinks],
        rehypePlugins: [rehypeMathJaxSvg, rehypePrism, [rehypeMermaid]],
      }),
      enforce: 'pre',
    } as PluginOption,
    react(),
  ],

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
});

import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeMathJaxSvg from 'rehype-mathjax/svg';

import rehypePrism from 'rehype-prism-plus/all';
import rehypeMermaid from 'rehype-mermaid';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({
  build: {
    rollupOptions: {
      input: {
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
        server.middlewares.use(
          (req, _, next) => {
            if (req.url === '/') {
              req.url = '/docs.html';
            }
            next();
          },
        );
      },
    },

    // config MDX
    {
      ...mdx({
        mdxExtensions: ['.mdx', '.md'],
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeMathJaxSvg,
          rehypePrism,
          [rehypeMermaid,],
        ],
      }),
      enforce: 'pre',
    } as PluginOption,
    react(),
  ],

  css: {
    transformer: 'lightningcss',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
}));

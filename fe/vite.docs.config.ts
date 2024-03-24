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
            // if (req.url === '/' || req.url?.endsWith('.mdx') || req.url?.endsWith('.md')) {
            if (req.url === '/') {
              req.url = '/docs.html';
              // res.setHeader('content-type', 'text/javascript');
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
          [
            rehypeMermaid,
            {
              strategy: 'img-svg',
              // render double images for both dark and light mode
              dark: true,
            },
          ],
        ],
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
}));

/* eslint-disable @typescript-eslint/no-explicit-any */

import mdx from '@mdx-js/rollup';
import path from 'node:path';
import rehypeMathJaxSvg from 'rehype-mathjax/svg';
import rehypeMermaid from 'rehype-mermaid';

import rehypePrism from 'rehype-prism-plus/all';
import remarkGfm from 'remark-gfm';
import remarkInlineLinks from 'remark-inline-links';
import remarkMath from 'remark-math';
import { defineConfig, PluginOption } from 'vite';

// noinspection ES6PreferShortImport
import { baseCfg, deepIndex } from './vite.config';

/**
 * poor man link rewriter without any external dependency to suite my self
 * documentation need for this project.
 */
function rewriteRelativeLink() {
  type Ast = {
    children: Ast | Ast[] | undefined;
    type: string;
  };

  const visit = (t: Ast, match: string, transform: (t: Ast) => Ast) => {
    if (!t || !t.type) {
      return;
    }

    if (t.type === match) {
      t = transform(t);
    }

    if (!t.children) {
      return;
    }

    if (Array.isArray(t.children)) {
      t.children.forEach((child) => visit(child, match, transform));
      return;
    }

    visit(t.children, match, transform);
  };

  const knownSchemes = ['http://', 'https://', 'mailto:'];

  return (tree: Ast, file: any) => {
    visit(tree, 'link', (t) => {
      const v: any = t;
      const url = v.url as string;
      if (knownSchemes.some((scheme) => url.startsWith(scheme))) {
        return v;
      }

      let p = path
        .resolve(path.dirname(file.history[0]), url)
        .replace('src/', '');
      p = p.replace(file.cwd, '#');
      console.log(v.url, p);
      v.url = p;
      return v;
    });
  };
}

// https://vitejs.dev/config/
const mdxCfg = (): PluginOption => ({
  ...mdx({
    mdxExtensions: ['.mdx', '.md'],
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkInlineLinks,
      rewriteRelativeLink,
    ],
    rehypePlugins: [rehypeMathJaxSvg, rehypePrism, [rehypeMermaid]],
  }),
  enforce: 'pre',
});

// noinspection JSUnusedGlobalSymbols
export default defineConfig(() => {
  const base = baseCfg('./src/main/docs/index.html');
  const [roll, deepIndexPlugin] = deepIndex(`./src/main/docs/index.html`);

  return {
    ...base,
    ...{
      build: { rollupOptions: roll },
      server: { port: 5050, strictPort: true },
      plugins: [...base.plugins!, deepIndexPlugin, mdxCfg()],
    },
  };
});

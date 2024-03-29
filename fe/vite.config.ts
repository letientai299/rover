import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { RollupOptions } from 'rollup';

import {
  createLogger,
  defineConfig,
  Logger,
  PluginOption,
  UserConfig,
} from 'vite';
import { UserConfig as UserConfigTest } from 'vitest';

export function deepIndex(entry: string): [RollupOptions, PluginOption] {
  // consider docs.html as the root path
  const plug: PluginOption = {
    name: 'deep-index',
    configureServer(server) {
      server.middlewares.use((req, _, next) => {
        if (req.url === '/') {
          req.url = entry;
        }
        next();
      });
    },
  };

  const roll: RollupOptions = {
    input: {
      app: entry,
    },
  };

  return [roll, plug];
}

function customLogger(): Logger {
  const logger = createLogger();
  const originalWarning = logger.warn;
  logger.warn = (msg, options) => {
    // ignore empty CSS for file that contains only mixing.
    if (msg.includes('vite:css') && msg.includes(' is empty')) return;

    originalWarning(msg, options);
  };
  return logger;
}

export function baseCfg(entry: string): UserConfig & UserConfigTest {
  const [roll, plug] = deepIndex(entry);

  return {
    build: {
      rollupOptions: roll,
    },
    customLogger: customLogger(),
    plugins: [react(), plug],

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

    test: {
      coverage: {
        provider: 'v8',
      },
    },
  };
}

export default defineConfig(baseCfg('./src/main/app/index.html'));

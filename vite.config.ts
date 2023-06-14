import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, ESBuildOptions, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';

  const envPrefix = 'APP_';
  const env = loadEnv(mode, process.cwd(), envPrefix);

  let esbuild: ESBuildOptions | boolean = false;
  let sourcemap = false;

  // dev命令支持各个环境
  let proxyTarget = env[`${envPrefix}BASE_URL`];
  if (isDev) {
    if (!/^(http|https)/.test(proxyTarget)) {
      proxyTarget = `https:${proxyTarget}`;
    }
    env[`${envPrefix}BASE_URL`] = '';
  }

  process.env = {
    ...process.env,
    ...env,
  };

  const plugins = [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports-deps.d.ts',
    }),
    Components({
      dirs: ['src/components', 'src/layouts'],
      dts: 'src/auto-imports-comps.d.ts',
      resolvers: [
        // TIPS: 自动引入组件库配置
      ],
    }),
  ];

  if (isDev) {
    plugins.push(
      checker({
        vueTsc: true,
      }),
    );
  }

  // 构建代码时
  if (!isDev) {
    if (mode === 'development') {
      plugins.push(
        visualizer({
          filename: './bundle-analyzer.html',
          gzipSize: true,
          brotliSize: true,
        }),
      );
    }

    if (mode !== 'production') {
      sourcemap = true;
    }

    if (mode === 'production' || mode === 'pre') {
      esbuild = {
        drop: ['console'],
      };
    }
  }

  return {
    define: {
      'process.env': process.env,
    },
    envPrefix,
    plugins,
    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
      },
    },
    esbuild,
    build: {
      sourcemap,
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        // TIPS: 根据项目实际情况配置代理
        // '/api': {
        //   target: proxyTarget,
        //   changeOrigin: true,
        // },
      },
    },
  };
});

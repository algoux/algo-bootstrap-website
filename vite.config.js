const { defineConfig, loadEnv } = require('vite');
const path = require('path');
const viteSSR = require('vite-ssr/plugin');
const vue = require('@vitejs/plugin-vue');

const isProd = process.env.NODE_ENV === 'production';

module.exports = defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: '0.0.0.0', // 允许局域网访问
      fs: {
        // The API logic is in outside of the project
        strict: false,
      },
    },
    // If using CDN, you can set base like 'https://yourcdn.com/dist/'
    // base: isProd ? '/dist/' : undefined,
    base: './',
    define: {
      'process.env': {
        BWCX_RUNTIME_SCOPE: JSON.stringify('client'),
        VITE_VERSION: env.VITE_VERSION || '1.0.0',
        VITE_RELEASES_TIME: env.VITE_RELEASES_TIME || '2025-09-07',
      },
    },
    resolve: {
      alias: {
        '@public': path.resolve(__dirname, './public'),
        '@client': path.resolve(__dirname, './src/client'),
        '@common': path.resolve(__dirname, './src/common'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: true,
      // 解决 @charset 警告
      cssCodeSplit: true,
      // 增加文件大小警告限制
      chunkSizeWarningLimit: 800,
    },
    // CSS 预处理器配置
    css: {
      preprocessorOptions: {
        less: {
          // 解决 @charset 冲突
          charset: false,
        },
      },
      // 添加 PostCSS 配置来处理 @charset
      postcss: {
        plugins: [
          {
            postcssPlugin: 'remove-charset',
            Once(root) {
              root.walkAtRules('charset', (rule) => {
                rule.remove();
              });
            }
          }
        ]
      }
    },
    plugins: [
      viteSSR({
        build: {
          keepIndexHtml: true,
        },
      }),
      vue(),
    ],
  };
});

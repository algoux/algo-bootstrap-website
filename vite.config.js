const { defineConfig, loadEnv } = require('vite');
const path = require('path');
const viteSSR = require('vite-ssr/plugin');
const vue = require('@vitejs/plugin-vue');
// import seoPrerender from 'vite-plugin-seo-prerender'
const isProd = process.env.NODE_ENV === 'production';

module.exports = defineConfig(({ mode }) => {
  return {
    server: {
      host: '0.0.0.0',
      fs: {
        strict: false,
      },
    },
    // If using CDN, you can set base like 'https://yourcdn.com/dist/'
    base: isProd ? '/dist/' : undefined,
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
      rollupOptions: {
        external: (id) => {
          // 在 SSR 构建时排除 Three.js 相关模块
          if (process.env.SSR && (id.includes('three') || id.includes('@three'))) {
            return true;
          }
          return false;
        }
      }
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
        // 改善 SSR 水合
        features: {
          clientRouting: true,
        },
        // 确保客户端正确挂载
        clientOptions: {
          mode: 'spa-hydrate'
        }
      }),
      vue(),
    ],
  };
});

import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import * as process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, CWD)
  // console.log(mode, env, CWD)

  return defineConfig({
    plugins: [
      // vue
      vue(),
      // devtools
      VueDevTools(),
      // ant-design-vue 按需加载
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
      // unocss
      UnoCSS(),
      // svg-icons
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(CWD, 'src/assets/svg')],
        // Specify symbolId format
        symbolId: 'svg-icon-[dir]-[name]',
      }),
      // 分析打包文件
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/stats.html',
      }),
      // 压缩文件
      env.VITE_COMPRESSION === 'brotli'
        ? viteCompression({
            verbose: true,
            disable: false,
            deleteOriginFile: false,
            threshold: 10240,
            algorithm: 'brotliCompress',
            ext: '.br',
          })
        : env.VITE_COMPRESSION === 'gzip'
          ? viteCompression({
              verbose: true,
              disable: false,
              deleteOriginFile: false,
              threshold: 10240,
              algorithm: 'gzip',
              ext: '.gz',
            })
          : null,
      // 图片压缩
      env.VITE_IMAGE_OPTIMIZER === 'true' ? ViteImageOptimizer() : null,
    ],
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          // 最小化拆分包
          manualChunks: (id) => {
            if (id.includes('node_modules') && env.VITE_MANUAL_CHUNKS === 'true') {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      open: true,
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/ikun-api': {
          target: env.VITE_API_BASE_URL, // 接口的域名
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
          rewrite: (path) => path.replace(/^\/ikun-api/, ''),
        },
      },
    },
  })
}

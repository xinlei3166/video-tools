import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { loadEnv, defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

const root = path.resolve(__dirname, 'src/render')
const publicDir = path.resolve(__dirname, 'src/render/public')
const outDir = path.resolve(__dirname, 'dist/render')

// @ts-ignore
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  // const base = env.VITE_APP_ENV === 'production' ? CDN_PATH : '/'
  return defineConfig({
    define: {
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
      'process.env': {}
    },
    build: {
      outDir,
      emptyOutDir: true
    },
    css: { preprocessorOptions: {} },
    plugins: [
      vue(),
      jsx(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [
          TDesignResolver({
            library: 'vue-next'
          })
        ],
        dts: false
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: 'vue-next'
          })
        ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // title: 'title',
            // injectScript: `<script src="./inject.js"></script>`
          }
        }
      })
    ],
    root,
    base: './',
    publicDir,
    resolve: {
      alias: {
        '@': root
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.vue', '.json', '.less', '.scss', '.css']
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : []
    }
    // server: {
    //   proxy: {
    //     [env.VITE_API_URL]: {
    //       target: env.VITE_PROXY_TARGET,
    //       changeOrigin: true,
    //       secure: false,
    //       rewrite: path => path.replace(new RegExp(`^${env.VITE_API_URL}`), '')
    //     }
    //   }
    // }
  })
}

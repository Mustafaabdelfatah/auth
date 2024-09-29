import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueDevTools(),
        svgLoader({
            svgoConfig: {
                multipass: true
            },
            svgo: true
        }),
        Vuetify({
            styles: {
                configFile: 'src/assets/sass/vuetify/settings.scss',
            },
        }),
        ViteImageOptimizer({
            /* pass your config */
            // test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
            // exclude: undefined,
            // include: undefined,
            // includePublic: true,
            // logStats: true,
            // ansiColors: true,
            // svg: {
            //     multipass: true,
            //     plugins: [
            //         {
            //             name: 'preset-default',
            //             params: {
            //                 overrides: {
            //                     cleanupNumericValues: false,
            //                     removeViewBox: false, // https://github.com/svg/svgo/issues/1128
            //                 },
            //                 cleanupIDs: {
            //                     minify: false,
            //                     remove: false,
            //                 },
            //                 convertPathData: false,
            //             },
            //         },
            //         'sortAttrs',
            //         {
            //             name: 'addAttributesToSVGElement',
            //             params: {
            //                 attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
            //             },
            //         },
            //     ],
            // },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    optimizeDeps: {
        include: ['@fawmi/vue-google-maps', 'fast-deep-equal']
    },
    esbuild: {
        drop: ['console'],
    },
})

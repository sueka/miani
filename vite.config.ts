import { exec as execSync } from 'node:child_process'
import { promisify } from 'node:util'
import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import topLevelAwait from 'vite-plugin-top-level-await'

const exec = promisify(execSync)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact({
      babel: {
        plugins: [
          [
            'formatjs',
            {
              idInterpolationPattern: '[sha512:contenthash:base64:6]',
              ast: true,
            },
          ],
        ],
      },
    }),
    {
      name: 'Extract Messages',
      async closeBundle() {
        await exec(
          "bun x formatjs extract 'src/**/*.tsx' --out-file dev-dist/lang.json",
        )
        await exec(
          'bun x formatjs compile dev-dist/lang.json --out-file src/messages/en.json',
        )
      },
    },
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'miani',
      },
      devOptions: {
        enabled: true,
      },
    }),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
})

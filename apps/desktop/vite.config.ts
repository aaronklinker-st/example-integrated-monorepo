import { defineConfig, mergeConfig } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import sharedConfig, { monorepoPaths } from '../../vite.shared.cts'

// https://vitejs.dev/config/
const electronConfig = defineConfig({
  plugins: [
    electron([
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
        vite: {
          plugins: [monorepoPaths()],
        },
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          options.reload()
        },
      },
    ]),
    renderer(),
  ],
})

export default mergeConfig(sharedConfig, electronConfig)

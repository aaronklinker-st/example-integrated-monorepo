import { defineConfig, mergeConfig } from 'vite'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'
import sharedConfig from '../../vite.shared.cts'

function generateManifest() {
  const manifest = readJsonFile('src/manifest.json')
  const pkg = readJsonFile('package.json')
  return {
    version: pkg.version,
    ...manifest,
  }
}

const extensionConfig = defineConfig({
  plugins: [
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ['package.json', 'src/manifest.json'],
    }),
  ],
})

export default mergeConfig(sharedConfig, extensionConfig)

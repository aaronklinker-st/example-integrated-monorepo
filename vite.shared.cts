import { Plugin, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import fs from 'node:fs/promises'

/**
 * Adds `resolve.alias` entries for all the packages in the monorepo.
 * Does not resolve apps/*, and app should not depend on another app.
 */
export const monorepoPaths = (): Plugin => ({
  name: 'monorepo-paths',
  async config(config) {
    // Get packages
    const packages = await fs.readdir(resolve(__dirname, 'packages'))

    // Assign aliases
    const aliases: Record<string, string> = {}
    for (const pkg of packages) {
      aliases[`@${pkg}`] = resolve(__dirname, 'packages', pkg, 'src')
    }
    config.resolve ??= {}
    config.resolve.alias ??= {}
    Object.assign(config.resolve.alias, aliases)

    return config
  },
})

export default defineConfig({
  plugins: [vue(), monorepoPaths()],
})

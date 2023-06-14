import { ListrTask } from 'listr2'
import fs from 'node:fs/promises'
import { resolve } from 'node:path'
import prettier from 'prettier'
import JSON5 from 'json5'

/**
 * Update the tsconfig.json file with path aliases to the monorepo packages.
 */
export const prepareTsconfigPaths: ListrTask = {
  title: 'Prepare tsconfig.json paths',
  task: async () => {
    // Get directories
    const [apps, packages] = await Promise.all([
      fs.readdir(resolve(__dirname, '../apps')),
      fs.readdir(resolve(__dirname, '../packages')),
    ])
    const all = [
      ...apps.sort().map((app) => ['apps', app]),
      ...packages.sort().map((pkg) => ['packages', pkg]),
    ]

    // Generate path aliases
    const aliases = new Map<string, string[]>() // Using map to keep a consistent order
    for (const [dir, pkg] of all) {
      aliases.set(`@${pkg}`, [`./${dir}/${pkg}/src/index.ts`])
      aliases.set(`@${pkg}/*`, [`./${dir}/${pkg}/src/*`])
    }

    // Update tsconfig.json
    const tsconfigPath = resolve(__dirname, '../tsconfig.json')
    const tsconfig = JSON5.parse(await fs.readFile(tsconfigPath, 'utf-8'))
    tsconfig.compilerOptions.paths = Object.fromEntries(aliases)
    await fs.writeFile(
      tsconfigPath,
      prettier.format(JSON5.stringify(tsconfig), { parser: 'json' }),
    )
  },
}

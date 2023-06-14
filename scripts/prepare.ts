import { Listr } from 'listr2'
import { prepareTsconfigPaths } from './prepare-tsconfig-paths'

const tasks = new Listr([prepareTsconfigPaths])

tasks.run().catch((err) => {
  console.error(err)
  process.exit(1)
})

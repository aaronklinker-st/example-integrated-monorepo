import { execSync } from 'node:child_process'

const versionWithV = execSync('electron -v', { encoding: 'utf-8' }).trim()
const version = versionWithV.slice(1)
console.log(version)

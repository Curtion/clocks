import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

export default defineEventHandler(async () => {
  try {
    const publicDir = join(process.cwd(), 'public', 'clocks')
    const files = await readdir(publicDir)

    const htmlFiles = files.filter(file => file.endsWith('.html'))
    htmlFiles.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

    return htmlFiles
  } catch (error) {
    console.error('Error reading clocks directory:', error)
    return []
  }
})

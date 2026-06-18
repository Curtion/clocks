import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

// 规范分类顺序 (用户指定, 非字母序)
const CATEGORIES = [
  'Claude',
  'GPT',
  'DeepSeek',
  'GLM',
  'Qwen',
  'MiniMax',
  'Gemini',
  'Kimi',
  'Other',
] as const

interface Clock { category: string, name: string, path: string }

export default defineEventHandler(async () => {
  const publicDir = join(process.cwd(), 'public')
  const clocks: Clock[] = []

  for (const category of CATEGORIES) {
    let files: string[]
    try {
      files = await readdir(join(publicDir, category))
    } catch {
      // 子目录不存在或不可读时跳过
      continue
    }

    const htmlFiles = files
      .filter(file => file.endsWith('.html'))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

    for (const file of htmlFiles) {
      clocks.push({
        category,
        name: file.replace(/\.html$/, ''),
        path: `${category}/${file}`,
      })
    }
  }

  return {
    categories: ['All', ...CATEGORIES],
    clocks,
  }
})

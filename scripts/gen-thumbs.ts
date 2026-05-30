// usage: node scripts/gen-thumbs.ts

import { spawn } from 'child_process'
import { mkdir } from 'fs/promises'
import { join } from 'path'
import sharp from 'sharp'

const URL = 'http://127.0.0.1:4000/longer-tweets/posts.json'

type PostEntry = {
  title: string
  /** starts with / */
  id: string
}

const posts = await fetch(URL)
  .then(r => r.json() as Promise<PostEntry[]>)
  .catch(cause =>
    Promise.reject(
      new Error(
        `Failed to get ${URL}, are you running 'bundle exec jekyll serve --drafts'?`,
        { cause }
      )
    )
  )

const OUT_DIR = 'images/generated-thumbnails'
await mkdir(OUT_DIR, { recursive: true })

for (const { id: slashedId, title } of posts) {
  const id = slashedId.replace('/', '')

  const child = spawn(
    'typst',
    [
      'compile',
      '--font-path',
      'scripts',
      '--input',
      `title=${title}`,
      '--ppi',
      '96',
      '--root',
      '.',
      'scripts/thumbnail.typ',
      join(OUT_DIR, `${id}.png`)
    ],
    { stdio: 'inherit' }
  )
  child.on('error', error => {
    console.error(`[${id}] typst error`, error)
  })
  child.on('close', code => {
    if (code) {
      console.error(`[${id}] received nonzero exit code ${code} from typst`)
      return
    }
    sharp(join(OUT_DIR, `${id}.png`))
      .jpeg()
      .toFile(join(OUT_DIR, `${id}.jpg`))
      .catch(cause =>
        Promise.reject(
          new Error(`[${id}] failed to convert to jpeg`, { cause })
        )
      )
  })
}

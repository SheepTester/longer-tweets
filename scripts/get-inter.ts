// usage: node scripts/get-inter.ts

import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'

type ListResponse = {
  zipName: string
  manifest: {
    files: { filename: string; contents: string }[]
    fileRefs: {
      url: string
      filename: string
      date: { seconds: number; nanos: number }
    }[]
  }
}

const {
  manifest: { fileRefs }
}: ListResponse = await fetch(
  'https://fonts.google.com/download/list?family=Inter'
)
  .then(r => r.text())
  .then(json => JSON.parse(json.replace(")]}'", '')))

const collator = new Intl.Collator([], { numeric: true })
const [{ url, filename } = {}] = fileRefs
  .filter(file => file.filename.includes('Regular'))
  // get largest font size
  .toSorted((a, b) => collator.compare(b.filename, a.filename))

if (!url) {
  console.error(fileRefs.map(file => file.filename))
  throw new Error('cant find variablefont')
}

const response = await fetch(url)
if (!response.body) {
  throw new TypeError('no body')
}

await finished(
  Readable.fromWeb(response.body).pipe(
    createWriteStream(`scripts/${filename?.split('/').at(-1)}`)
  )
)

// @ts-check

import fs from 'fs/promises'
import { micromark } from 'micromark'
import {
  gfmAutolinkLiteral,
  gfmAutolinkLiteralHtml
} from 'micromark-extension-gfm-autolink-literal'
import {
  gfmStrikethrough,
  gfmStrikethroughHtml
} from 'micromark-extension-gfm-strikethrough'
import YAML from 'yaml'

/** @type {import('./GitHubIssuesAction.ts').Action} */
const action = JSON.parse(process.argv[2])
const { issue, sender } = action

const postId = issue.title.startsWith('💬')
  ? issue.title.replace('💬', '').trim()
  : issue.body.includes('💬')
  ? issue.body.split('💬')[1]?.split('-->')[0]?.trim()
  : undefined
if (!postId) {
  console.log(
    'Please use the provided prefilled GitHub link on the corresponding longer tweet, and do not edit the title. Or did you mean to [create a new issue](https://github.com/SheepTester/longer-tweets/issues/new)?'
  )
  process.exit()
} else if (!issue.title.startsWith('💬')) {
  console.log("Don't edit the title! bruh")
}

if (sender.login !== issue.user.login) {
  console.log(
    `@SheepTester Why are the sender and issue user different? \`${sender.login}\` vs \`${issue.user.login}\``
  )
  console.error(JSON.stringify(action, null, 2))
}
if (sender.html_url !== `https://github.com/${sender.login}`) {
  console.log(
    `@SheepTester Why is the profile URL different than the login? ${sender.html_url} vs https://github.com/${sender.login}`
  )
  console.error(JSON.stringify(action, null, 2))
}

/** @type {import('./GitHubIssuesAction.ts').LongerTweetComment} */
const comment = {
  author: sender.login,
  avatar: sender.avatar_url,
  // micromark doesn't support comments, presumably requires HTML mode
  // also can't find extension
  content_html: micromark(issue.body.replace(/<!--[^]+?-->/g, ''), {
    extensions: [gfmAutolinkLiteral(), gfmStrikethrough()],
    htmlExtensions: [gfmAutolinkLiteralHtml(), gfmStrikethroughHtml()]
  })
    .replace(/<a /g, '<a rel="nofollow" ')
    .replace(/\r/g, ''),
  issue_number: issue.number,
  timestamp: new Date(issue.updated_at)
}

/** @type {Record<string, import('./GitHubIssuesAction.ts').LongerTweetComment[]>} */
const comments = YAML.parse(await fs.readFile('_data/comments.yml', 'utf-8'))

comments[postId] ??= []
comments[postId].unshift(comment)

await fs.writeFile('_data/comments.yml', YAML.stringify(comments))

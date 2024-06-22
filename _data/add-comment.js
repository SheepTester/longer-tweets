// @ts-check

import YAML from 'yaml'
import fs from 'fs/promises'

/** @type {Action} */
const action = JSON.parse(process.argv[2])
const { issue, sender } = action

if (!issue.title.startsWith('💬')) {
  console.log(
    'Please use the provided prefilled GitHub link on the corresponding longer tweet, and do not edit the title. Or did you mean to [create a new issue](https://github.com/SheepTester/longer-tweets/issues/new)?'
  )
  process.exit()
}
const postId = issue.title.replace('💬', '').trim()

if (sender.login !== issue.user.login) {
  console.log(
    `@SheepTester Why are the sender and issue user different? \`${sender.login}\` vs \`${issue.user.login}\``
  )
  console.error(JSON.stringify(action, null, 2))
}
if (sender.avatar_url !== `https://github.com/${sender.login}`) {
  console.log(
    `@SheepTester Why is the avatar URL different than the login? ${sender.avatar_url} vs https://github.com/${sender.login}`
  )
  console.error(JSON.stringify(action, null, 2))
}

/** @type {LongerTweetComment} */
const comment = {
  author: sender.login,
  avatar: sender.avatar_url,
  content_html: issue.body,
  issue_number: issue.number,
  timestamp: new Date(issue.updated_at)
}

/** @type {Record<string, LongerTweetComment[]>} */
const comments = YAML.parse(await fs.readFile('_data/comments.yml', 'utf-8'))

comments[postId] ??= []
comments[postId].unshift(comment)

await fs.writeFile('_data/comments.yml', YAML.stringify(comments))

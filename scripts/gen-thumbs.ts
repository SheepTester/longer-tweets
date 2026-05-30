const URL = 'http://127.0.0.1:4000/longer-tweets/posts.json'

type PostEntry = {
  title: string
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

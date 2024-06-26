// https://github.com/SheepTester/longer-tweets/actions/runs/9621482769/job/26541468824

export type User = {
  avatar_url: string
  html_url: string
  login: string
}

export type Action = {
  issue: {
    body: string
    created_at: string
    html_url: string
    number: number
    title: string
    updated_at: string
    user: User
  }
  sender: User
}

export type LongerTweetComment = {
  author: string
  content_html: string
  issue_number: number
  avatar: string
  timestamp: Date
}

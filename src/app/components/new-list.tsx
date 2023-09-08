import { Database } from '../../../database.types'
import Counter from './counter'

type News = Database['public']['Tables']['news']['Row']

async function fetchNews() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.url}/rest/v1/news?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
  })
  if (!res.ok) {
    throw new Error('failed to fetch data in server ')
  }
  const news: News[] = await res.json()
  return news
}

export default async function NewsList() {
  const news = await fetchNews()
  return (
    <div>
      <Counter />
      <p>News</p>
      <ul>
        {news.map((n) => (
          <li key={n.id}>
            <p>{n.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

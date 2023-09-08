import { Database } from '../../../database.types'
import { format } from 'date-fns'

type Note = Database['public']['Tables']['notes']['Row']

async function fetchNotes() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.url}/rest/v1/notes?select=*`, {
    // cacheオプション
    // - 未指定(or 'force-cache')の場合はgetStaticProps扱い export cost revalidate = false
    // - 'no-store'の場合はgetServerSideProps扱い export const revalidate = 0
    // - { next: { revalidate: 10 } }でisr(incremental static regeneration)扱い
    // ビルド時のアイコンが変化：　○（static）, λ(server)
    cache: 'no-store',
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
  })
  if (!res.ok) {
    throw new Error('failed to fetch data in server')
  }
  const notes: Note[] = await res.json()
  return notes
}

export default async function NoteList() {
  // server componentの場合、componentレベルでasync-awaitが可能
  // client componentの場合、useEffect, ReactQuery, useSWRを使う必要があった
  const notes = await fetchNotes()
  return (
    <div>
      <p>Notes</p>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.id}</p>
            <p>{note.title}</p>
            <p>{format(new Date(note.created_at), 'yyyy-MM-dd HH:mm:ss')}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// dynamic renderingを一括で有効化する
export const revalidate = 0

import { Suspense } from 'react'
import Spinner from '../components/spinner'
import BlogList from '../components/blog-list'
import NewsList from '../components/new-list'

// server component
export default function StreamingServerRenderingPage() {
  return (
    <section className="flex">
      <aside className="w-1/4">
        <section className="fixed h-full w-1/4">
          <Suspense fallback={<Spinner />}>
            <BlogList />
          </Suspense>
        </section>
      </aside>
      <main>
        <section className="fixed  w-3/4">
          <Suspense fallback={<Spinner />}>
            <NewsList />
          </Suspense>
        </section>
      </main>
    </section>
  )
}

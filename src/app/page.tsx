import NoteList from './components/note-list'
import RefreshButton from './components/refresh-button'
import Spinner from './components/spinner'
import TimerCounter from './components/timer-counter'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <h1 className="m-5 text-center">hello world 😊</h1>

      {/* NoteListが解決するまで、hello worldやTimerCounterが実行されないことを回避 */}
      <Suspense fallback={<Spinner />}>
        <NoteList></NoteList>
      </Suspense>

      {/* <Spinner></Spinner> */}
      <TimerCounter></TimerCounter>
      {/* next/navigation/useRouterを使うと、クライアントコンポーネントのuseStateの値が保持される。※リロードすると当然消える */}
      <RefreshButton></RefreshButton>
    </main>
  )
}

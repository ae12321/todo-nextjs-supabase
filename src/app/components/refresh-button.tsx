'use client'
import { useRouter } from 'next/navigation'

export default function RefreshButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => {
        router.refresh()
      }}
      className="text-white bg-indigo-500 hover:bg-indigo-300 px-3 py-1 rounded font-sm"
    >
      Refresh current router
    </button>
  )
}

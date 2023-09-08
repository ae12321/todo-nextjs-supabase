'use client'
import { useRouter } from 'next/navigation'

export default function RouterButton({
  description = '',
}: {
  description: string
}) {
  const router = useRouter()
  return (
    <button
      onClick={() => {
        router.push(`/${description}`)
      }}
      className="text-white bg-indigo-500 hover:bg-indigo-300 px-3 py-1 rounded font-sm"
    >
      Nav to {description ? description : 'home'}
    </button>
  )
}

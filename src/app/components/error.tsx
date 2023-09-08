'use client'
// 'use client': クライアントコンポーネントにするを意味する

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <p className="text-center text-red-500">data fetching in server failed</p>
    </div>
  )
}

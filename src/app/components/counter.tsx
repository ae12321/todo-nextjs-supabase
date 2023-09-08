'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
    </div>
  )
}

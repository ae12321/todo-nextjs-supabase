'use client'
import { useState, useEffect } from 'react'

export default function TimerCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCount((prev) => prev + 1), 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => setCount(0)}
        className="text-white bg-indigo-500 hover:bg-indigo-300 px-3 py-1 rounded font-sm"
      >
        reset
      </button>
    </div>
  )
}

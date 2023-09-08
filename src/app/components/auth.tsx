'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'

export default function Auth() {
  const { loginUser } = useStore()
  const [isLogin, setIsLogin] = React.useState(true)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  // ログイン成功時の自動遷移用
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        router.push('/')
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      }
    }
  }
  async function signOut() {
    supabase.auth.signOut()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p>{loginUser.email}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        onClick={signOut}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        />
      </svg>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="rounded border border-gray-400 px-4 py-2 text-sm placeholder-gray-700 focus:outline-none"
            type="text"
            required
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="rounded border border-gray-400 px-4 py-2 text-sm placeholder-gray-700 focus:outline-none"
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center text-sm">
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </div>
        <p
          onClick={() => setIsLogin((prev) => !prev)}
          className="cursor-pointer font-medium hover:text-slate-500"
        >
          change mode ?
        </p>
      </form>
    </div>
  )
}

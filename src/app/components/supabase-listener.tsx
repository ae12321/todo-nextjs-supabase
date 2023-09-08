'use client'
import useStore from '@/store'
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SupabaseListener({
  // サーバサイドにあるアクセストークン
  accessToken,
}: {
  accessToken?: string
}) {
  const router = useRouter()
  const { updateLoginUser } = useStore()
  useEffect(() => {
    const getUserInfo = async () => {
      // ブラウザに存在するセッション情報を取得
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        updateLoginUser({
          id: data.session?.user.email,
          email: data.session?.user.email!,
        })
      }
    }

    getUserInfo()
    // ユーザのセッション情報を監視するもの（ログイン、アウトがされるたびに呼び出される）
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id, email: session?.user.email! })
      // クライアントサイドのトークン（session?.access_token）とサーバサイドのトークンが異なる場合、サーバコンポーネントを再実行する
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })
  }, [accessToken, router, updateLoginUser])

  return null
}

import { cookies } from 'next/headers'
import SupabaseListener from '../components/supabase-listener'
// サーバコンポーネントで使用できるsupabaseのインスタンスを生成する
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../database.types'

// export const dynamic = 'force-dynamic'

export default async function AuthLeayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  // ブラウザ側で持っているアクセストークンをサーバコンポーネントに渡すことができる
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  // サーバサイドで持っているセッション情報
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <>
      <SupabaseListener accessToken={session?.access_token} />
      {children}
    </>
  )
}

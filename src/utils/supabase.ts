// クライアントで使用するsupabaseのインスタンス
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../database.types'

export default createPagesBrowserClient<Database>()

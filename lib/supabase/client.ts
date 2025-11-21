import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 在构建时和开发时的处理
let supabase: any = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
} else {
  console.warn('⚠️ Supabase not configured. Authentication will use mock mode.')
  
  // 创建一个模拟的 supabase 客户端
  supabase = {
    auth: {
      signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
        error: null
      }),
      updateUser: async () => ({ data: null, error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error('Supabase not configured') })
        })
      })
    })
  }
}

export { supabase }

// 便捷的认证函数
export const auth = {
  signUp: async (email: string, password: string, options?: { data?: any }) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    return await supabase.auth.signUp({
      email,
      password,
      options
    })
  },

  signIn: async (email: string, password: string) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { data: null, error: new Error('Supabase not configured') }
    }

    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { error: null }
    }
    
    return await supabase.auth.signOut()
  },

  getCurrentUser: async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  getCurrentSession: async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null
    }
    
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
}
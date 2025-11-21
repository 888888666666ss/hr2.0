'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User as SupabaseUser, AuthChangeEvent, Session } from '@supabase/supabase-js'
import type { User, UserRole } from './roles'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查当前的 Supabase 认证状态
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // 从 Supabase 用户数据创建应用用户对象
          const appUser: User = {
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '用户',
            email: session.user.email || '',
            role: session.user.user_metadata?.role || 'employee' // 默认角色
          }
          setUser(appUser)
        } else {
          // 检查是否有模拟登录 cookie (用于开发测试)
          const authCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('auth_token='))
          
          if (authCookie && authCookie.includes('mock-token-')) {
            // 从 localStorage 恢复模拟用户信息（开发模式）
            const savedUser = localStorage.getItem('mock_user')
            if (savedUser) {
              const userInfo = JSON.parse(savedUser)
              setUser(userInfo)
            }
          }
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const appUser: User = {
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '用户',
            email: session.user.email || '',
            role: session.user.user_metadata?.role || 'employee'
          }
          setUser(appUser)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          // 清除模拟登录数据
          localStorage.removeItem('mock_user')
          document.cookie = 'auth_token=; path=/; max-age=0'
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      if (!email || email.trim() === '') {
        throw new Error('请输入邮箱地址')
      }

      // 优先尝试 Supabase 认证
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          // 如果是开发环境且 Supabase 未配置，则使用模拟登录
          if (process.env.NODE_ENV === 'development') {
            console.warn('Supabase 认证失败，使用模拟登录:', error.message)
            await mockLogin(email, password)
            return
          }
          throw error
        }

        // Supabase 认证成功，用户状态将通过 onAuthStateChange 更新
        return
      } else {
        // 环境变量未配置，使用模拟登录（开发模式）
        await mockLogin(email, password)
      }
      
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(error.message || '登录失败')
    }
  }

  // 模拟登录函数（用于开发测试）
  const mockLogin = async (email: string, password: string) => {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 创建模拟用户数据
    const mockUser: User = {
      id: 'mock-user-' + Date.now(),
      name: email.split('@')[0] || '测试用户',
      email: email,
      role: 'hr_admin' // 默认给HR管理员权限方便测试
    }
    
    // 设置用户状态
    setUser(mockUser)
    
    // 保存用户信息到 localStorage
    localStorage.setItem('mock_user', JSON.stringify(mockUser))
    
    // 设置模拟 cookie 供 middleware 使用
    document.cookie = `auth_token=mock-token-${mockUser.id}; path=/; max-age=86400; SameSite=Lax`
    
    console.log('🎉 模拟登录成功:', mockUser)
  }

  const logout = async () => {
    try {
      // 优先尝试 Supabase 登出
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        await supabase.auth.signOut()
      }
      
      // 清除模拟登录状态
      setUser(null)
      localStorage.removeItem('mock_user')
      document.cookie = 'auth_token=; path=/; max-age=0'
      
      console.log('🚪 登出成功')
      
      // 跳转到登录页
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
      // 即使出错也要清除本地状态
      setUser(null)
      localStorage.removeItem('mock_user')
      document.cookie = 'auth_token=; path=/; max-age=0'
      window.location.href = '/login'
    }
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      
      // 如果是 Supabase 用户，更新用户元数据
      if (user.id.startsWith('mock-') === false) {
        supabase.auth.updateUser({
          data: { role }
        }).catch((error: any) => {
          console.error('Failed to update user role in Supabase:', error)
        })
      } else {
        // 模拟用户，更新本地存储
        localStorage.setItem('mock_user', JSON.stringify(updatedUser))
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

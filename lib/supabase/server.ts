import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// 在构建时和运行时的处理
let supabaseAdmin: any = null

if (supabaseUrl && supabaseServiceRoleKey) {
  // 服务端客户端 - 拥有管理员权限，绕过 RLS
  supabaseAdmin = createClient<Database>(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
} else {
  console.warn('⚠️ Supabase server configuration not found. Database operations will use mock mode.')
  
  // 创建一个模拟的 supabase admin 客户端
  supabaseAdmin = {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error('Supabase not configured') })
        }),
        insert: async () => ({ data: null, error: new Error('Supabase not configured') }),
        update: async () => ({ data: null, error: new Error('Supabase not configured') }),
        delete: async () => ({ error: new Error('Supabase not configured') })
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({ data: null, error: new Error('Supabase not configured') })
        })
      })
    })
  }
}

export { supabaseAdmin }

// 服务端辅助函数
export const serverHelpers = {
  // 获取用户的公司信息
  getUserCompany: async (userId: string) => {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('company_id, companies(*)')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // 检查用户权限
  checkUserPermission: async (userId: string, permission: string) => {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return false
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select(`
        roles (
          role_permissions (
            permissions (
              name
            )
          )
        )
      `)
      .eq('id', userId)
      .single()
    
    if (error) throw error
    
    const userPermissions = data.roles?.role_permissions?.map(
      rp => rp.permissions?.name
    ) || []
    
    return userPermissions.includes(permission)
  },

  // 创建系统日志
  createSystemLog: async (
    companyId: string,
    userId: string | null,
    action: string,
    resourceType: string | null,
    resourceId: string | null,
    details: any = {},
    ipAddress?: string,
    userAgent?: string
  ) => {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.warn('Supabase not configured, skipping system log')
      return null
    }

    const { data, error } = await supabaseAdmin
      .from('system_logs')
      .insert({
        company_id: companyId,
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details,
        ip_address: ipAddress,
        user_agent: userAgent
      })
    
    if (error) throw error
    return data
  },

  // 发送通知
  createNotification: async (
    companyId: string,
    userId: string,
    title: string,
    message: string,
    type: string = 'in_app',
    category: string = 'system',
    actionUrl?: string,
    metadata: any = {}
  ) => {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.warn('Supabase not configured, skipping notification')
      return null
    }

    const { data, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        company_id: companyId,
        user_id: userId,
        title,
        message,
        type,
        category,
        action_url: actionUrl,
        metadata
      })
    
    if (error) throw error
    return data
  }
}
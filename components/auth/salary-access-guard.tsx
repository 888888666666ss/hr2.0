'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { canAccessSalary } from '@/lib/auth/roles'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface SalaryAccessGuardProps {
  children: React.ReactNode
  requiredUserId?: string
}

export function SalaryAccessGuard({ children, requiredUserId }: SalaryAccessGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      // Check if user has permission to access salary data
      if (!canAccessSalary(user.role, requiredUserId, user.id)) {
        router.push('/unauthorized')
      }
    } else if (!isLoading && !user) {
      // Not logged in
      router.push('/login')
    }
  }, [user, isLoading, router, requiredUserId])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">正在加载...</div>
      </div>
    )
  }

  if (!user || !canAccessSalary(user.role, requiredUserId, user.id)) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}
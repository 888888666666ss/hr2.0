'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, ArrowLeft, Home } from 'lucide-react'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <Shield className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-xl">访问被拒绝</CardTitle>
            <CardDescription>
              您没有权限访问此页面
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              此页面仅允许薪酬管理员或相关员工访问。如果您认为这是错误，请联系系统管理员。
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回上页
              </Button>
              <Button onClick={() => router.push('/')}>
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
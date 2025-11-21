'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Key, Eye, EyeOff, Building2, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

export default function LoginPage() {
  // ��箱登录状态
  const [email, setEmail] = useState('')
  const [emailPassword, setEmailPassword] = useState('')
  
  // 卡号登录状态
  const [cardNumber, setCardNumber] = useState('')
  const [cardPassword, setCardPassword] = useState('')
  
  // 通用状态
  const [rememberPassword, setRememberPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  
  const handleEmailPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailPassword(e.target.value)
  }
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value)
  }
  
  const handleCardPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardPassword(e.target.value)
  }
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log('邮箱登录信息:', { email, emailPassword, rememberPassword })
    
    try {
      // 调用真实的 auth context login 方法
      await login(email, emailPassword)
      
      // 登录成功后跳转到主页
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('登录失败:', error)
      alert('登录失败，请检查邮箱和密码')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCardLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log('卡号登录信息:', { cardNumber, cardPassword, rememberPassword })
    
    try {
      // 调用真实的 auth context login 方法，使用卡号作为邮箱格式
      await login(cardNumber + '@card.local', cardPassword)
      
      // 登录成功后跳转到主页
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('登录失败:', error)
      alert('登录失败，请检查卡号和密码')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">欢迎回来</CardTitle>
          <CardDescription>登录您的人力资源管理账户</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                邮箱登录
              </TabsTrigger>
              <TabsTrigger value="card" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                卡号登录
              </TabsTrigger>
            </TabsList>
            
            {/* 邮箱登录表单 */}
            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        placeholder="请输入邮箱地址" 
                        className="pl-10" 
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="emailPassword">密码</Label>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                        忘记密码?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="emailPassword" 
                        type={showPassword ? "text" : "password"} 
                        value={emailPassword} 
                        onChange={handleEmailPasswordChange} 
                        placeholder="请输入密码" 
                        className="pl-10 pr-10" 
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="remember-email"
                      type="checkbox"
                      checked={rememberPassword}
                      onChange={() => setRememberPassword(!rememberPassword)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="remember-email" className="ml-2 block text-sm text-gray-900">
                      记住密码
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        登录中...
                      </>
                    ) : (
                      '登录'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            {/* 卡号登录表单 */}
            <TabsContent value="card" className="space-y-4">
              <form onSubmit={handleCardLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">卡号</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Key className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="cardNumber" 
                        value={cardNumber} 
                        onChange={handleCardNumberChange} 
                        placeholder="请输入卡号" 
                        className="pl-10" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardPassword">密码</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="cardPassword" 
                        type={showPassword ? "text" : "password"} 
                        value={cardPassword} 
                        onChange={handleCardPasswordChange} 
                        placeholder="请输入密码" 
                        className="pl-10 pr-10" 
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="remember-card"
                      type="checkbox"
                      checked={rememberPassword}
                      onChange={() => setRememberPassword(!rememberPassword)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="remember-card" className="ml-2 block text-sm text-gray-900">
                      记住密码
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        登录中...
                      </>
                    ) : (
                      '登录'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Separator />
          <p className="text-center text-sm text-muted-foreground">
            还没有账号?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 hover:underline">
              立即注册
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

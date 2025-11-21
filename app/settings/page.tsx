'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LinkIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [autoArchive, setAutoArchive] = useState(false)
  const [weeklyReports, setWeeklyReports] = useState(true)
  
  const handleBindAccount = (platform: string) => {
    // Mock successful binding - in real app, this would integrate with external APIs
    console.log(`Binding ${platform} account...`)
    alert(`${platform} 账号绑定成功！`)
  }
  
  const handleSaveSettings = () => {
    // Mock save success - in real app, this would save to backend
    console.log('Saving settings...', { emailNotifications, autoArchive, weeklyReports })
    alert('设置保存成功！')
  }
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="系统设置" description="配置系统参数和集成" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>快速导航</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/settings/channels">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    渠道管理
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Account Integration */}
            <Card>
              <CardHeader>
                <CardTitle>招聘平台账号绑定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <LinkIcon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">BOSS 直聘</p>
                      <p className="text-sm text-muted-foreground">
                        同步岗位发布和简历获取
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">未绑定</Badge>
                    <Button variant="outline" onClick={() => handleBindAccount('BOSS 直聘')}>绑定账号</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                      <LinkIcon className="h-5 w-5 text-orange-700 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">智联招聘</p>
                      <p className="text-sm text-muted-foreground">
                        同步岗位发布和简历获取
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">未绑定</Badge>
                    <Button variant="outline" onClick={() => handleBindAccount('智联招聘')}>绑定账号</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                      <LinkIcon className="h-5 w-5 text-green-700 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">猎聘网</p>
                      <p className="text-sm text-muted-foreground">
                        高端人才招聘平台
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">未绑定</Badge>
                    <Button variant="outline" onClick={() => handleBindAccount('猎聘网')}>绑定账号</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle>系统配置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">AI 自动分析</p>
                    <p className="text-sm text-muted-foreground">
                      自动对上传的简历进行 AI 分析
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="peer sr-only" 
                    />
                    <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-5"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">邮件通知</p>
                    <p className="text-sm text-muted-foreground">
                      重要事件发送邮件通知
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      checked={weeklyReports}
                      onChange={(e) => setWeeklyReports(e.target.checked)}
                      className="peer sr-only" 
                    />
                    <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-5"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">自动归档</p>
                    <p className="text-sm text-muted-foreground">
                      90天未更新的候选人自动归档
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      checked={autoArchive}
                      onChange={(e) => setAutoArchive(e.target.checked)}
                      className="peer sr-only" 
                    />
                    <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="settings" />
    </div>
  )
}

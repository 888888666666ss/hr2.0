'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Briefcase, FileText, ArrowUpRight, ArrowDownRight, Calendar, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    {
      title: '开放岗位',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Briefcase,
      link: '/job-reqs',
    },
    {
      title: '待处理审批',
      value: '8',
      change: '+3',
      trend: 'up',
      icon: CheckCircle,
      link: '/approvals',
    },
    {
      title: '活跃候选人',
      value: '51',
      change: '+12',
      trend: 'up',
      icon: Users,
      link: '/recruitment',
    },
    {
      title: '本周面试',
      value: '32',
      change: '-5',
      trend: 'down',
      icon: Calendar,
      link: '/interviews',
    },
  ]

  const recentActivities = [
    {
      title: '张三进入技术面试阶段',
      position: '高级前端工程师',
      type: 'candidate',
      time: '5分钟前',
    },
    {
      title: 'UI 设计师岗位需求待审批',
      position: '设计部',
      type: 'approval',
      time: '30分钟前',
    },
    {
      title: '李四完成 AI 初筛面试',
      position: '产品经理',
      type: 'interview',
      time: '1小时前',
    },
    {
      title: '王五的 Offer 已发送',
      position: 'UI 设计师',
      type: 'offer',
      time: '3小时前',
    },
    {
      title: '智联招聘渠道同步完成',
      position: '新增 24 份简历',
      type: 'channel',
      time: '今天 10:30',
    },
  ]

  const urgentTasks = [
    { task: '审批 3 个岗位需求', priority: 'high', link: '/approvals' },
    { task: '处理 12 份新简历', priority: 'high', link: '/resumes' },
    { task: '安排本周 8 场面试', priority: 'medium', link: '/interviews' },
    { task: '配置猎聘渠道对接', priority: 'low', link: '/settings/channels' },
  ]

  const quickActions = [
    { label: '创建岗位需求', link: '/job-reqs', icon: Briefcase },
    { label: '查看审批中心', link: '/approvals', icon: CheckCircle },
    { label: '招聘流程', link: '/recruitment', icon: Users },
    { label: '渠道管理', link: '/settings/channels', icon: TrendingUp },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="系统首页"
          description="欢迎回来，这是您的工作台概览"
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat) => (
              <Link key={stat.title} href={stat.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="flex items-center text-xs">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
                      )}
                      <span
                        className={
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }
                      >
                        {stat.change}
                      </span>
                      <span className="ml-1 text-muted-foreground">较上周</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>最近动态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        activity.type === 'candidate' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        activity.type === 'approval' ? 'bg-orange-100 dark:bg-orange-900/30' :
                        activity.type === 'interview' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        activity.type === 'offer' ? 'bg-green-100 dark:bg-green-900/30' :
                        'bg-gray-100 dark:bg-gray-900/30'
                      }`}>
                        {activity.type === 'candidate' && <Users className="h-5 w-5 text-blue-600" />}
                        {activity.type === 'approval' && <Clock className="h-5 w-5 text-orange-600" />}
                        {activity.type === 'interview' && <Calendar className="h-5 w-5 text-purple-600" />}
                        {activity.type === 'offer' && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {activity.type === 'channel' && <TrendingUp className="h-5 w-5 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.position}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Urgent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>待办任务</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {urgentTasks.map((item, index) => (
                    <Link key={index} href={item.link}>
                      <div className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted cursor-pointer transition-colors">
                        <span className="text-sm text-foreground">{item.task}</span>
                        <Badge
                          variant={
                            item.priority === 'high'
                              ? 'destructive'
                              : item.priority === 'medium'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {item.priority === 'high'
                            ? '高'
                            : item.priority === 'medium'
                            ? '中'
                            : '低'}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto flex-col gap-2 py-4"
                    asChild
                  >
                    <Link href={action.link}>
                      <action.icon className="h-6 w-6" />
                      <span className="text-sm">{action.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <AIAssistant page="dashboard" />
    </div>
  )
}

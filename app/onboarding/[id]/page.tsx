'use client'

import { useParams, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Download, Edit, User, CheckCircle, Clock, AlertCircle, FileText, Users, Calendar } from 'lucide-react'

export default function OnboardingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const onboardingId = params.id

  // 模拟数据，实际应从API获取
  const onboarding = {
    id: onboardingId,
    employee: {
      name: '张三',
      position: '高级前端工程师',
      department: '技术部',
      employeeId: 'EMP2024001',
      email: 'zhangsan@company.com',
      phone: '138****1234',
      startDate: '2024-03-01'
    },
    status: 'in-progress',
    progress: 65,
    mentor: '李经理',
    hr: '王小美',
    checklist: [
      {
        category: '入职准备',
        items: [
          { task: '签署劳动合同', status: 'completed', dueDate: '2024-02-28' },
          { task: '填写员工信息表', status: 'completed', dueDate: '2024-02-28' },
          { task: '提交身份证复印件', status: 'completed', dueDate: '2024-02-28' },
          { task: '银行卡信息登记', status: 'completed', dueDate: '2024-02-28' }
        ]
      },
      {
        category: '账号开通',
        items: [
          { task: '企业邮箱开通', status: 'completed', dueDate: '2024-03-01' },
          { task: 'OA系统账号', status: 'completed', dueDate: '2024-03-01' },
          { task: '开发环境权限', status: 'in-progress', dueDate: '2024-03-02' },
          { task: 'VPN账号申请', status: 'pending', dueDate: '2024-03-02' }
        ]
      },
      {
        category: '设备配置',
        items: [
          { task: '办公电脑配置', status: 'completed', dueDate: '2024-03-01' },
          { task: '工作手机配发', status: 'pending', dueDate: '2024-03-03' },
          { task: '门禁卡制作', status: 'pending', dueDate: '2024-03-03' }
        ]
      },
      {
        category: '培训安排',
        items: [
          { task: '公司文化培训', status: 'completed', dueDate: '2024-03-01' },
          { task: '部门介绍会议', status: 'in-progress', dueDate: '2024-03-04' },
          { task: '技术栈培训', status: 'pending', dueDate: '2024-03-05' },
          { task: '项目交接培训', status: 'pending', dueDate: '2024-03-07' }
        ]
      }
    ],
    schedule: [
      {
        date: '2024-03-01',
        time: '09:00',
        event: 'HR入职接待',
        status: 'completed'
      },
      {
        date: '2024-03-01', 
        time: '10:00',
        event: '公司文化培训',
        status: 'completed'
      },
      {
        date: '2024-03-01',
        time: '14:00',
        event: '部门经理面谈',
        status: 'completed'
      },
      {
        date: '2024-03-04',
        time: '09:30',
        event: '团队介绍会议',
        status: 'scheduled'
      },
      {
        date: '2024-03-05',
        time: '14:00',
        event: '技术培训',
        status: 'scheduled'
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'in-progress': return 'secondary'
      case 'pending': return 'outline'
      case 'scheduled': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'in-progress': return '进行中'
      case 'pending': return '待处理'
      case 'scheduled': return '已安排'
      default: return '未知'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-orange-600" />
      case 'scheduled': return <Calendar className="h-4 w-4 text-blue-600" />
      default: return null
    }
  }

  const getTotalItems = () => {
    return onboarding.checklist.reduce((total, category) => total + category.items.length, 0)
  }

  const getCompletedItems = () => {
    return onboarding.checklist.reduce((total, category) => 
      total + category.items.filter(item => item.status === 'completed').length, 0
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader 
          title={`入职详情 - ${onboarding.employee.name}`} 
          description={`${onboarding.employee.position} • ${onboarding.employee.department}`}
        >
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            编辑流程
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-6xl">
            {/* 员工信息概览 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{onboarding.employee.name}</h2>
                      <p className="text-muted-foreground">{onboarding.employee.position}</p>
                      <p className="text-sm text-muted-foreground">
                        员工编号: {onboarding.employee.employeeId} • 入职日期: {onboarding.employee.startDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-1">{onboarding.progress}%</div>
                    <div className="text-sm text-muted-foreground">完成进度</div>
                    <Progress value={onboarding.progress} className="w-32 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* 联系信息 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    基本信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">部门</span>
                    <span className="font-medium">{onboarding.employee.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">邮箱</span>
                    <span className="font-medium">{onboarding.employee.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">电话</span>
                    <span className="font-medium">{onboarding.employee.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">入职导师</span>
                    <span className="font-medium">{onboarding.mentor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HR负责人</span>
                    <span className="font-medium">{onboarding.hr}</span>
                  </div>
                </CardContent>
              </Card>

              {/* 进度概览 */}
              <Card>
                <CardHeader>
                  <CardTitle>入职进度概览</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>总计任务</span>
                      <span className="font-medium">{getTotalItems()} 项</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>已完成</span>
                      <span className="font-medium text-green-600">{getCompletedItems()} 项</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>待处理</span>
                      <span className="font-medium text-orange-600">{getTotalItems() - getCompletedItems()} 项</span>
                    </div>
                    <Progress value={onboarding.progress} className="mt-4" />
                    
                    <div className="pt-4 border-t space-y-2">
                      {onboarding.checklist.map((category, index) => {
                        const completed = category.items.filter(item => item.status === 'completed').length
                        const total = category.items.length
                        const progress = (completed / total) * 100
                        
                        return (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{category.category}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{completed}/{total}</span>
                              <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 入职清单 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  入职清单
                </CardTitle>
                <CardDescription>跟踪各个阶段的入职任务完成情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {onboarding.checklist.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-3">
                      <h4 className="font-medium text-lg border-b pb-2">{category.category}</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(item.status)}
                              <div>
                                <div className="font-medium">{item.task}</div>
                                <div className="text-xs text-muted-foreground">
                                  截止: {item.dueDate}
                                </div>
                              </div>
                            </div>
                            <Badge variant={getStatusColor(item.status)}>
                              {getStatusText(item.status)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 入职安排 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  入职安排
                </CardTitle>
                <CardDescription>新员工入职期间的活动和培训安排</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {onboarding.schedule.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      {getStatusIcon(event.status)}
                      <div className="flex-1">
                        <div className="font-medium">{event.event}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.date} {event.time}
                        </div>
                      </div>
                      <Badge variant={getStatusColor(event.status)}>
                        {getStatusText(event.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex gap-3 pt-4">
              <Button>
                <CheckCircle className="mr-2 h-4 w-4" />
                更新进度
              </Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                联系导师
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                添加备注
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                导出报告
              </Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="onboarding-detail" />
    </div>
  )
}
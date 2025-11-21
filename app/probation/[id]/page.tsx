'use client'

import { useParams, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Download, Edit, User, CheckCircle, Clock, AlertCircle, FileText, Users, Star, TrendingUp } from 'lucide-react'

export default function ProbationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const probationId = params.id

  // 模拟数据，实际应从API获取
  const probation = {
    id: probationId,
    employee: {
      name: '张三',
      position: '高级前端工程师',
      department: '技术部',
      employeeId: 'EMP2024001',
      email: 'zhangsan@company.com',
      hireDate: '2024-01-15',
      probationStart: '2024-01-15',
      probationEnd: '2024-04-15'
    },
    status: 'active',
    daysLeft: 45,
    progress: 70,
    mentor: '李经理',
    hr: '王小美',
    evaluations: [
      {
        month: '第一个月',
        date: '2024-02-15',
        scores: {
          workQuality: 8,
          workEfficiency: 7,
          teamwork: 9,
          learning: 8,
          communication: 9
        },
        overall: 8.2,
        feedback: '表现良好，能够快速适应工作环境，学习能力强。建议在工作效率方面继续提升。',
        mentor: '李经理'
      },
      {
        month: '第二个月',
        date: '2024-03-15',
        scores: {
          workQuality: 9,
          workEfficiency: 8,
          teamwork: 9,
          learning: 8,
          communication: 9
        },
        overall: 8.6,
        feedback: '进步明显，工作质量和效率都有提升，团队合作表现优秀。',
        mentor: '李经理'
      }
    ],
    tasks: [
      { task: '完成新员工培训', status: 'completed', dueDate: '2024-01-20' },
      { task: '熟悉项目代码结构', status: 'completed', dueDate: '2024-01-30' },
      { task: '独立完成第一个功能模块', status: 'completed', dueDate: '2024-02-15' },
      { task: '参与代码评审', status: 'completed', dueDate: '2024-02-28' },
      { task: '协助团队解决技术难题', status: 'in-progress', dueDate: '2024-03-30' },
      { task: '制定下阶段工作计划', status: 'pending', dueDate: '2024-04-10' }
    ],
    goals: [
      {
        category: '技术能力',
        items: [
          { goal: '掌握公司前端技术栈', progress: 90, target: '100%' },
          { goal: '独立开发复杂功能', progress: 75, target: '80%' },
          { goal: '代码质量达标', progress: 85, target: '85%' }
        ]
      },
      {
        category: '团队协作',
        items: [
          { goal: '积极参与团队讨论', progress: 95, target: '90%' },
          { goal: '有效沟通协作', progress: 90, target: '85%' }
        ]
      },
      {
        category: '学习成长',
        items: [
          { goal: '完成培训课程', progress: 100, target: '100%' },
          { goal: '技术分享参与', progress: 80, target: '75%' }
        ]
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'in-progress': return 'secondary'
      case 'pending': return 'outline'
      case 'active': return 'secondary'
      default: return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'in-progress': return '进行中'
      case 'pending': return '待处理'
      case 'active': return '试用期中'
      default: return '未知'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600'
    if (score >= 7) return 'text-blue-600'
    if (score >= 6) return 'text-orange-600'
    return 'text-red-600'
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500'
    if (progress >= 75) return 'bg-blue-500'
    if (progress >= 60) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader 
          title={`试用期详情 - ${probation.employee.name}`} 
          description={`${probation.employee.position} • ${probation.employee.department}`}
        >
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出评估
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            添加评估
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-6xl">
            {/* 员工基本信息 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{probation.employee.name}</h2>
                      <p className="text-muted-foreground">{probation.employee.position}</p>
                      <p className="text-sm text-muted-foreground">
                        员工编号: {probation.employee.employeeId} • 入职日期: {probation.employee.hireDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant={getStatusColor(probation.status)} className="mb-2">
                      {getStatusText(probation.status)}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      试用期: {probation.employee.probationStart} ~ {probation.employee.probationEnd}
                    </div>
                    <div className={`text-lg font-bold ${
                      probation.daysLeft < 30 ? 'text-orange-600' : 'text-muted-foreground'
                    }`}>
                      剩余 {probation.daysLeft} 天
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* 基本信息 */}
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
                    <span className="font-medium">{probation.employee.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">邮箱</span>
                    <span className="font-medium text-sm">{probation.employee.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">导师</span>
                    <span className="font-medium">{probation.mentor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HR负责人</span>
                    <span className="font-medium">{probation.hr}</span>
                  </div>
                </CardContent>
              </Card>

              {/* 评估概览 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    评估概览
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {probation.evaluations[probation.evaluations.length - 1]?.overall || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">最新综合评分</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>已完成评估</span>
                      <span className="font-medium">{probation.evaluations.length} 次</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>整体进度</span>
                      <span className="font-medium">{probation.progress}%</span>
                    </div>
                    <Progress value={probation.progress} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* 任务完成情况 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    任务完成
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>总任务数</span>
                      <span className="font-medium">{probation.tasks.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>已完成</span>
                      <span className="font-medium text-green-600">
                        {probation.tasks.filter(t => t.status === 'completed').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>进行中</span>
                      <span className="font-medium text-blue-600">
                        {probation.tasks.filter(t => t.status === 'in-progress').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>待处理</span>
                      <span className="font-medium text-orange-600">
                        {probation.tasks.filter(t => t.status === 'pending').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 月度评估 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  月度评估记录
                </CardTitle>
                <CardDescription>试用期期间的定期评估结果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {probation.evaluations.map((evaluation, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-lg">{evaluation.month}评估</h4>
                          <p className="text-sm text-muted-foreground">评估日期: {evaluation.date}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(evaluation.overall)}`}>
                            {evaluation.overall}
                          </div>
                          <div className="text-sm text-muted-foreground">综合评分</div>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-5">
                        <div className="text-center p-3 bg-muted rounded">
                          <div className={`text-lg font-bold ${getScoreColor(evaluation.scores.workQuality)}`}>
                            {evaluation.scores.workQuality}
                          </div>
                          <div className="text-xs text-muted-foreground">工作质量</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded">
                          <div className={`text-lg font-bold ${getScoreColor(evaluation.scores.workEfficiency)}`}>
                            {evaluation.scores.workEfficiency}
                          </div>
                          <div className="text-xs text-muted-foreground">工作效率</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded">
                          <div className={`text-lg font-bold ${getScoreColor(evaluation.scores.teamwork)}`}>
                            {evaluation.scores.teamwork}
                          </div>
                          <div className="text-xs text-muted-foreground">团队合作</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded">
                          <div className={`text-lg font-bold ${getScoreColor(evaluation.scores.learning)}`}>
                            {evaluation.scores.learning}
                          </div>
                          <div className="text-xs text-muted-foreground">学习能力</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded">
                          <div className={`text-lg font-bold ${getScoreColor(evaluation.scores.communication)}`}>
                            {evaluation.scores.communication}
                          </div>
                          <div className="text-xs text-muted-foreground">沟通能力</div>
                        </div>
                      </div>

                      <div className="bg-muted p-3 rounded">
                        <div className="text-sm text-muted-foreground mb-1">
                          评估人: {evaluation.mentor}
                        </div>
                        <p className="text-sm">{evaluation.feedback}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 目标完成情况 */}
            <Card>
              <CardHeader>
                <CardTitle>目标完成情况</CardTitle>
                <CardDescription>试用期关键目标的达成情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {probation.goals.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-3">
                      <h4 className="font-medium text-lg border-b pb-2">{category.category}</h4>
                      <div className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-4 p-3 border rounded">
                            <div className="flex-1">
                              <div className="font-medium">{item.goal}</div>
                              <div className="text-sm text-muted-foreground">
                                目标: {item.target}
                              </div>
                            </div>
                            <div className="text-right min-w-[80px]">
                              <div className={`text-lg font-bold ${
                                item.progress >= 90 ? 'text-green-600' : 
                                item.progress >= 75 ? 'text-blue-600' : 
                                'text-orange-600'
                              }`}>
                                {item.progress}%
                              </div>
                              <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all ${getProgressColor(item.progress)}`}
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 任务清单 */}
            <Card>
              <CardHeader>
                <CardTitle>试用期任务清单</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {probation.tasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : task.status === 'in-progress' ? (
                          <Clock className="h-4 w-4 text-blue-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        )}
                        <div>
                          <div className="font-medium">{task.task}</div>
                          <div className="text-sm text-muted-foreground">
                            截止: {task.dueDate}
                          </div>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(task.status)}>
                        {getStatusText(task.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex gap-3 pt-4">
              {probation.daysLeft <= 0 && (
                <Button>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  提交转正申请
                </Button>
              )}
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                添加评估
              </Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                联系导师
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                导出报告
              </Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="probation-detail" />
    </div>
  )
}
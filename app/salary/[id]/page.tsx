'use client'

import { useParams, useRouter } from 'next/navigation'
import { SalaryAccessGuard } from '@/components/auth/salary-access-guard'
import { useAuth } from '@/lib/auth/auth-context'
import { canManageSalary } from '@/lib/auth/roles'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Edit, DollarSign, TrendingUp, Calendar } from 'lucide-react'

export default function SalaryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const salaryId = params.id

  // 模拟薪酬详情数据
  const salaryDetail = {
    id: salaryId,
    employee: {
      name: '张三',
      id: 'EMP2024001',
      position: '高级前端工程师',
      department: '技术部'
    },
    period: '2024年1月',
    details: {
      baseSalary: 20000,
      performanceBonus: 5000,
      allowances: {
        transportation: 500,
        meal: 500
      },
      deductions: {
        socialSecurity: 1200,
        housingFund: 800,
        tax: 500
      },
      netSalary: 23500
    },
    paymentInfo: {
      payDate: '2024-01-25',
      status: 'paid',
      paymentMethod: '银行转账'
    },
    attendanceInfo: {
      workingDays: 22,
      actualDays: 22,
      overtimeHours: 8,
      leaveHours: 0
    }
  }

  const totalAllowances = Object.values(salaryDetail.details.allowances).reduce((sum, val) => sum + val, 0)
  const totalDeductions = Object.values(salaryDetail.details.deductions).reduce((sum, val) => sum + val, 0)
  const grossSalary = salaryDetail.details.baseSalary + salaryDetail.details.performanceBonus + totalAllowances

  return (
    <SalaryAccessGuard requiredUserId={salaryDetail.employee.id}>
      <div className="flex min-h-screen flex-col">
      <PageHeader 
        title={`薪酬详情 - ${salaryDetail.employee.name}`}
        description={`${salaryDetail.period} • ${salaryDetail.employee.position}`}
      >
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          下载工资条
        </Button>
        {user && canManageSalary(user.role) && (
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            编辑薪酬
          </Button>
        )}
      </PageHeader>

      <div className="flex-1 space-y-6 p-6 max-w-5xl">
        {/* 员工信息 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{salaryDetail.employee.name}</h2>
                <p className="text-muted-foreground">
                  {salaryDetail.employee.position} • {salaryDetail.employee.department}
                </p>
                <p className="text-sm text-muted-foreground">
                  员工编号: {salaryDetail.employee.id}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  ¥{salaryDetail.details.netSalary.toLocaleString()}
                </div>
                <div className="text-muted-foreground">实发工资</div>
                <Badge variant={salaryDetail.paymentInfo.status === 'paid' ? 'default' : 'secondary'}>
                  {salaryDetail.paymentInfo.status === 'paid' ? '已发放' : '待发放'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 薪酬明细 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                薪酬明细
              </CardTitle>
              <CardDescription>{salaryDetail.period}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">基本工资</span>
                  <span className="font-medium">¥{salaryDetail.details.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">绩效奖金</span>
                  <span className="font-medium text-green-600">
                    +¥{salaryDetail.details.performanceBonus.toLocaleString()}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="text-sm text-muted-foreground mb-2">各项补贴</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">交通补贴</span>
                      <span className="text-green-600">+¥{salaryDetail.details.allowances.transportation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">餐费补贴</span>
                      <span className="text-green-600">+¥{salaryDetail.details.allowances.meal}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-2">
                  <div className="text-sm text-muted-foreground mb-2">各项扣除</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">社会保险</span>
                      <span className="text-red-600">-¥{salaryDetail.details.deductions.socialSecurity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">住房公积金</span>
                      <span className="text-red-600">-¥{salaryDetail.details.deductions.housingFund}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">个人所得税</span>
                      <span className="text-red-600">-¥{salaryDetail.details.deductions.tax}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>实发工资</span>
                    <span className="text-primary">¥{salaryDetail.details.netSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 发放信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                发放信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">发放日期</span>
                  <span className="font-medium">{salaryDetail.paymentInfo.payDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">发放状态</span>
                  <Badge variant={salaryDetail.paymentInfo.status === 'paid' ? 'default' : 'secondary'}>
                    {salaryDetail.paymentInfo.status === 'paid' ? '已发放' : '待发放'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">发放方式</span>
                  <span className="font-medium">{salaryDetail.paymentInfo.paymentMethod}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm text-muted-foreground mb-3">考勤信息</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">应出勤天数</span>
                    <span>{salaryDetail.attendanceInfo.workingDays} 天</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">实际出勤</span>
                    <span>{salaryDetail.attendanceInfo.actualDays} 天</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">加班时数</span>
                    <span>{salaryDetail.attendanceInfo.overtimeHours} 小时</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">请假时数</span>
                    <span>{salaryDetail.attendanceInfo.leaveHours} 小时</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 薪酬汇总 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              薪酬汇总
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  ¥{grossSalary.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">应发工资</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  +¥{totalAllowances.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">补贴合计</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  -¥{totalDeductions.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">扣除合计</div>
              </div>
              <div className="text-center p-4 border rounded-lg bg-primary/5">
                <div className="text-2xl font-bold text-primary mb-1">
                  ¥{salaryDetail.details.netSalary.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground font-medium">实发工资</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="flex gap-3 pt-4">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            下载工资条
          </Button>
          {user && canManageSalary(user.role) && (
            <>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                编辑薪酬
              </Button>
              <Button variant="outline">
                查看历史记录
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
    </SalaryAccessGuard>
  )
}
'use client'

import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Award } from 'lucide-react'
import Link from 'next/link'

export default function PerformancePage() {
  const router = useRouter()
  const performanceData = [
    {
      id: 1,
      name: '张伟',
      position: '前端技术专家',
      department: '技术部',
      rating: 'A',
      score: 92,
      period: '2024-Q1',
    },
    {
      id: 2,
      name: '李娜',
      position: '高级产品经理',
      department: '产品部',
      rating: 'A',
      score: 90,
      period: '2024-Q1',
    },
    {
      id: 3,
      name: '王强',
      position: 'UI 设计主管',
      department: '设计部',
      rating: 'B+',
      score: 85,
      period: '2024-Q1',
    },
    {
      id: 4,
      name: '刘洋',
      position: '后端工程师',
      department: '技术部',
      rating: 'B',
      score: 82,
      period: '2024-Q1',
    },
  ]

  const handleCreatePerformanceReview = () => {
    router.push('/performance/new')
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="绩效管理" description="员工绩效评估和管理">
          <Button onClick={handleCreatePerformanceReview}>新建绩效评估</Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">
                      87.5
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">平均绩效分</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">
                      92%
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">完成评估率</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">45</div>
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">A 级员工</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">
                      2024-Q1
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">当前周期</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance List */}
            <Card>
              <CardHeader>
                <CardTitle>绩效评估列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceData.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {item.name[0]}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.position} • {item.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium text-foreground">
                            评分：{item.score}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.period}
                          </div>
                        </div>
                        <Badge
                          variant={
                            item.rating.startsWith('A')
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {item.rating}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/performance/${item.id}`}>查看</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AIAssistant page="performance" />
    </div>
  )
}

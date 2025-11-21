import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Settings } from 'lucide-react'
import Link from 'next/link'

export default function InterviewsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="面试管理" description="管理 AI 初筛和面试流程">
          <Button variant="outline" asChild>
            <Link href="/interviews/standards">
              <Settings className="mr-2 h-4 w-4" />
              面试标准
            </Link>
          </Button>
          <Button asChild>
            <Link href="/interviews/new">
              <Calendar className="mr-2 h-4 w-4" />
              创建面试
            </Link>
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">32</div>
                  <p className="text-sm text-muted-foreground">本周面试</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">18</div>
                  <p className="text-sm text-muted-foreground">AI 初筛</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <p className="text-sm text-muted-foreground">现场面试</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">85%</div>
                  <p className="text-sm text-muted-foreground">通过率</p>
                </CardContent>
              </Card>
            </div>

            {/* Interview List */}
            <Card>
              <CardHeader>
                <CardTitle>近期面试</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      candidate: '张三',
                      position: '高级前端工程师',
                      type: 'AI 初筛',
                      status: 'completed',
                      date: '2024-01-20 14:00',
                    },
                    {
                      id: 2,
                      candidate: '李四',
                      position: '产品经理',
                      type: '现场面试',
                      status: 'scheduled',
                      date: '2024-01-22 10:00',
                    },
                    {
                      id: 3,
                      candidate: '王五',
                      position: 'UI 设计师',
                      type: 'AI 初筛',
                      status: 'in-progress',
                      date: '2024-01-20 15:30',
                    },
                  ].map((interview, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                          <span className="font-medium text-secondary-foreground">
                            {interview.candidate[0]}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {interview.candidate}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {interview.position} • {interview.type}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {interview.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            interview.status === 'completed'
                              ? 'default'
                              : interview.status === 'in-progress'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {interview.status === 'completed'
                            ? '已完成'
                            : interview.status === 'in-progress'
                            ? '进行中'
                            : '待进行'}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/interviews/${interview.id}`}>查看详情</Link>
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

      <AIAssistant page="interviews" />
    </div>
  )
}

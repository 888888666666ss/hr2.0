'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function CandidatesPage() {
  const stages = [
    { name: '简历筛选', count: 24, color: 'bg-blue-500' },
    { name: 'AI 初筛', count: 12, color: 'bg-purple-500' },
    { name: '技术面试', count: 8, color: 'bg-orange-500' },
    { name: 'HR 面试', count: 5, color: 'bg-green-500' },
    { name: 'Offer', count: 2, color: 'bg-primary' },
  ]

  const candidates = [
    {
      id: 1,
      name: '张三',
      position: '高级前端工程师',
      stage: '技术面试',
      score: 92,
      avatar: '张',
    },
    {
      id: 2,
      name: '李四',
      position: '产品经理',
      stage: 'HR 面试',
      score: 88,
      avatar: '李',
    },
    {
      id: 3,
      name: '王五',
      position: 'UI 设计师',
      stage: 'AI 初筛',
      score: 85,
      avatar: '王',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="候选人流程"
          description="可视化看板管理招聘流程"
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {stages.map((stage) => (
                <Card key={stage.name} className="min-w-[280px] flex-shrink-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{stage.name}</CardTitle>
                      <Badge variant="secondary">{stage.count}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stage.name === '技术面试' ? (
                      <div className="space-y-3">
                        {candidates
                          .filter(candidate => candidate.stage === '技术面试')
                          .map((candidate) => (
                            <div key={candidate.id} className="rounded-lg border border-border bg-card p-3">
                              <div className="mb-2 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                    {candidate.avatar}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-foreground">
                                      {candidate.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {candidate.position}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                  {candidate.score}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                asChild
                              >
                                <Link href={`/candidates/${candidate.id}`}>查看详情</Link>
                              </Button>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="py-2 text-center text-sm text-muted-foreground">
                        {stage.count} 位候选人
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Candidate List */}
            <Card>
              <CardHeader>
                <CardTitle>所有候选人</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {candidate.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {candidate.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {candidate.position}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            评分：{candidate.score}
                          </p>
                          <Badge variant="outline">{candidate.stage}</Badge>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/candidates/${candidate.id}`}>
                            查看
                          </Link>
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

      <AIAssistant page="candidates" />
    </div>
  )
}

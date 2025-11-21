'use client'

import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResumeAnalysis } from '@/components/ai/resume-analysis'
import { InterviewQuestions } from '@/components/ai/interview-questions'
import { Mail, Phone, MapPin, Sparkles, Brain, MessageSquare } from 'lucide-react'
import { use } from 'react'

export default function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const handleAnalysisComplete = (analysis: any) => {
    console.log('Analysis:', analysis)
  }

  const handleQuestionsGenerated = (questions: any) => {
    console.log('Questions:', questions)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="候选人详情" description={`候选人 ID: ${id} - 张三 - 高级前端工程师`}>
          <Button variant="outline">发送消息</Button>
          <Button>推进流程</Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    张
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">张三</h2>
                    <p className="text-muted-foreground mb-4">
                      高级前端工程师 • 5年经验
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>zhangsan@email.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>138-0000-0000</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>北京</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                      <span className="text-2xl font-bold text-primary-foreground">
                        92
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">AI 综合评分</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Timeline */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="timeline" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="timeline">流程时间线</TabsTrigger>
                    <TabsTrigger value="ai-analysis" className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI 分析
                    </TabsTrigger>
                    <TabsTrigger value="interview" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      面试问题
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="timeline">
                    <Card>
                      <CardHeader>
                        <CardTitle>流程时间线</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              stage: '简历筛选',
                              status: 'completed',
                              date: '2024-01-15',
                            },
                            {
                              stage: 'AI 初筛面试',
                              status: 'completed',
                              date: '2024-01-18',
                            },
                            {
                              stage: '技术面试',
                              status: 'current',
                              date: '2024-01-20',
                            },
                            { stage: 'HR 面试', status: 'pending', date: '-' },
                            { stage: 'Offer', status: 'pending', date: '-' },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  item.status === 'completed'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : item.status === 'current'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-secondary-foreground'
                                }`}
                              >
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">
                                  {item.stage}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {item.date}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  item.status === 'completed'
                                    ? 'default'
                                    : item.status === 'current'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {item.status === 'completed'
                                  ? '已完成'
                                  : item.status === 'current'
                                  ? '进行中'
                                  : '待处理'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="ai-analysis">
                    <ResumeAnalysis
                      candidateId={id}
                      jobId="1"
                    />
                  </TabsContent>

                  <TabsContent value="interview">
                    <InterviewQuestions
                      jobId="1"
                      positionTitle="高级前端工程师"
                    />
                  </TabsContent>
                </Tabs>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>AI 评估总结</CardTitle>
                    <Sparkles className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium text-foreground">
                        综合评价
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        该候选人技术功底扎实，具有丰富的 React
                        开发经验，在面试中表现出良好的问题解决能力和沟通能力。建议进入下一轮面试。
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-foreground">
                        核心优势
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['React 专家', 'TypeScript', '性能优化', '团队协作'].map(
                          (tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>申请岗位</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-foreground">
                      高级前端工程师
                    </p>
                    <p className="text-sm text-muted-foreground">技术部 • 北京</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>快速操作</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline" onClick={() => router.push(`/resumes/${id}`)}>
                      查看完整简历
                    </Button>
                    <Button className="w-full" variant="outline" onClick={() => router.push(`/interviews/${id}`)}>
                      查看面试记录
                    </Button>
                    <Button className="w-full" variant="outline" onClick={() => router.push(`/offers/new?candidateId=${id}`)}>
                      生成 Offer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="candidates" />
    </div>
  )
}

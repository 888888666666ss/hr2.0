'use client'

import { useParams, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Edit, MessageSquare, User, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function InterviewDetailPage() {
  const params = useParams()
  const router = useRouter()
  const interviewId = params.id

  // 模拟数据，实际应从API获取
  const interview = {
    id: interviewId,
    candidate: '张三',
    position: '高级前端工程师',
    type: 'AI 初筛',
    status: 'completed',
    date: '2024-01-20 14:00',
    duration: '45分钟',
    interviewer: 'AI助手',
    score: 85,
    recommendation: '建议进入下一轮面试',
    questions: [
      {
        question: '请介绍一下您在React方面的经验',
        answer: '我有3年React开发经验，熟悉Hook、Context API等...',
        score: 9
      },
      {
        question: '如何优化React应用的性能？',
        answer: '可以通过useMemo、useCallback、React.memo等方式...',
        score: 8
      },
      {
        question: '描述一下您最具挑战性的项目',
        answer: '去年开发的大型电商平台，需要处理高并发...',
        score: 8
      }
    ],
    evaluation: {
      technical: 8,
      communication: 9,
      problemSolving: 8,
      overall: 8.3
    },
    notes: '候选人表现良好，技术基础扎实，沟通能力强，建议进入技术面试环节。'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'in-progress': return 'secondary'
      case 'scheduled': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'in-progress': return '进行中'
      case 'scheduled': return '待进行'
      default: return '未知'
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader 
          title={`面试详情 - ${interview.candidate}`} 
          description={`${interview.position} • ${interview.type}`}
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
            编辑评估
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-5xl">
            {/* 基本信息 */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    候选人信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">姓名</span>
                    <span className="font-medium">{interview.candidate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">应聘职位</span>
                    <span className="font-medium">{interview.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">面试类型</span>
                    <Badge variant="outline">{interview.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">面试状态</span>
                    <Badge variant={getStatusColor(interview.status)}>
                      {getStatusText(interview.status)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    面试安排
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">面试时间</span>
                    <span className="font-medium">{interview.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">持续时长</span>
                    <span className="font-medium">{interview.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">面试官</span>
                    <span className="font-medium">{interview.interviewer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">综合评分</span>
                    <span className="text-2xl font-bold text-primary">{interview.score}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 评估结果 */}
            <Card>
              <CardHeader>
                <CardTitle>能力评估</CardTitle>
                <CardDescription>各项能力评分详情</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{interview.evaluation.technical}</div>
                    <div className="text-sm text-muted-foreground">技术能力</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{interview.evaluation.communication}</div>
                    <div className="text-sm text-muted-foreground">沟通能力</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{interview.evaluation.problemSolving}</div>
                    <div className="text-sm text-muted-foreground">解决问题</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-primary/5">
                    <div className="text-2xl font-bold text-primary mb-1">{interview.evaluation.overall}</div>
                    <div className="text-sm text-muted-foreground font-medium">综合评分</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 面试问题 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  面试问题与回答
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {interview.questions.map((qa, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-foreground">
                          Q{index + 1}: {qa.question}
                        </h4>
                        <Badge variant="outline">得分: {qa.score}/10</Badge>
                      </div>
                      <div className="text-muted-foreground bg-muted p-3 rounded">
                        <strong>回答:</strong> {qa.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 面试评价 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {interview.score >= 80 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  )}
                  面试评价与建议
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">面试官评价</h4>
                    <p className="text-muted-foreground">{interview.notes}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      {interview.score >= 80 ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      )}
                      推荐建议
                    </h4>
                    <p className={`font-medium ${
                      interview.score >= 80 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {interview.recommendation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex gap-3 pt-4">
              <Button asChild>
                <Link href="/offers">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  发送 Offer
                </Link>
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                安排复试
              </Button>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                修改评估
              </Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="interview-detail" />
    </div>
  )
}
'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Users, DollarSign, CheckCircle, XCircle, Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState, use } from 'react'

export default function JobReqDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showAIMatch, setShowAIMatch] = useState(false)

  const jobReq = {
    id: id,
    title: '高级前端工程师',
    department: '技术部',
    location: '北京',
    owner: '张经理',
    headcount: 2,
    status: 'Open',
    priority: 'high',
    closeDate: '2024-03-15',
    salaryRange: '25-40K',
    level: '高级',
    description: `岗位职责：
1. 负责公司核心产品的前端开发工作
2. 参与产品技术方案设计和评审
3. 优化前端性能，提升用户体验
4. 指导初级工程师，进行技术分享

任职要求：
1. 5年以上前端开发经验
2. 精通 React、Vue 等主流框架
3. 熟悉 TypeScript、Next.js
4. 有大型项目经验`,
    channels: ['智联招聘', '前程无忧', 'Boss 直聘'],
    applicants: [
      { id: 1, name: '张三', score: 92, avatar: '张' },
      { id: 2, name: '李四', score: 88, avatar: '李' },
      { id: 3, name: '王五', score: 85, avatar: '王' },
    ],
    approvals: [
      { user: '张经理', role: '部门经理', status: 'approved', time: '2024-01-15 10:30', comment: '同意招聘' },
      { user: '李总监', role: 'HR 总监', status: 'approved', time: '2024-01-15 14:20', comment: '批准' },
    ],
  }

  const aiMatchedCandidates = [
    { id: 1, name: '张三', score: 92, reasons: ['5年React经验', 'Next.js项目经验', '大厂背景'] },
    { id: 2, name: '李四', score: 88, reasons: ['Vue转React经验', 'TypeScript熟练', '性能优化经验'] },
    { id: 3, name: '王五', score: 85, reasons: ['前端架构经验', '团队管理经验', '技术分享经验'] },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="岗位需求详情" description={`需求 ID: ${jobReq.id}`}>
          {jobReq.status === 'Open' && (
            <>
              <Button variant="outline" onClick={() => setShowAIMatch(true)}>
                <Sparkles className="mr-2 h-4 w-4" />
                AI 智能匹配
              </Button>
              <Button onClick={() => setShowPublishModal(true)}>发布到渠道</Button>
            </>
          )}
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{jobReq.title}</CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {jobReq.location}
                      </span>
                      <span>•</span>
                      <span>{jobReq.department}</span>
                      <span>•</span>
                      <span>{jobReq.level}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {jobReq.salaryRange}
                      </span>
                    </div>
                  </div>
                  <Badge variant="default" className="text-base">
                    {jobReq.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">招聘负责人</p>
                    <p className="mt-1 font-medium text-foreground">{jobReq.owner}</p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">招聘人数</p>
                    <p className="mt-1 font-medium text-foreground">{jobReq.headcount} 人</p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">截止日期</p>
                    <p className="mt-1 flex items-center gap-1 font-medium text-foreground">
                      <Calendar className="h-4 w-4" />
                      {jobReq.closeDate}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium text-foreground">岗位描述</h4>
                  <div className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm text-foreground">
                    {jobReq.description}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium text-foreground">已发布渠道</h4>
                  <div className="flex flex-wrap gap-2">
                    {jobReq.channels.map((channel) => (
                      <Badge key={channel} variant="secondary">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Approval Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>审批时间线</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobReq.approvals.map((approval, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          approval.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {approval.status === 'approved' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        </div>
                        {index < jobReq.approvals.length - 1 && (
                          <div className="h-full w-px bg-border"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{approval.user}</p>
                          <Badge variant="outline" className="text-xs">{approval.role}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{approval.comment}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {approval.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Linked Applicants */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>关联申请人 ({jobReq.applicants.length})</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowAIMatch(true)}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI 匹配推荐
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobReq.applicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {applicant.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{applicant.name}</p>
                          <p className="text-sm text-muted-foreground">匹配度：{applicant.score}%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/resumes/${applicant.id}`}>查看简历</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Publish to Channels Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">发布到招聘渠道</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowPublishModal(false)}>
                  ✕
                </Button>
              </div>
              <div className="space-y-3">
                {['智联招聘', '前程无忧', 'Boss 直聘', '拉勾网', '猎聘'].map((channel) => (
                  <label key={channel} className="flex items-center gap-3 rounded-lg border border-input p-3 hover:bg-muted cursor-pointer">
                    <input type="checkbox" defaultChecked={jobReq.channels.includes(channel)} />
                    <span className="text-sm font-medium text-foreground">{channel}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowPublishModal(false)}>
                  取消
                </Button>
                <Button onClick={() => {
                  setShowPublishModal(false)
                  alert('发布成功！')
                }}>
                  确认发布
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Match Results Modal */}
      {showAIMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">AI 智能匹配结果</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAIMatch(false)}>
                  ✕
                </Button>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                AI 已分析简历库中的候选人，以下是与该岗位最匹配的人选：
              </p>
              <div className="space-y-4">
                {aiMatchedCandidates.map((candidate) => (
                  <div key={candidate.id} className="rounded-lg border border-border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {candidate.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{candidate.name}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {candidate.score}
                            </div>
                            <span className="text-sm text-muted-foreground">匹配度</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/resumes/${candidate.id}`}>查看简历</Link>
                      </Button>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">匹配原因：</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.reasons.map((reason, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setShowAIMatch(false)}>关闭</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <AIAssistant page="job-req-detail" />
    </div>
  )
}

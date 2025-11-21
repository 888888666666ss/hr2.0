'use client'

import { useParams, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Edit, Send, User, Calendar, DollarSign, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function OfferDetailPage() {
  const params = useParams()
  const router = useRouter()
  const offerId = params.id

  // 模拟数据，实际应从API获取
  const offer = {
    id: offerId,
    candidate: '张三',
    position: '高级前端工程师',
    department: '技术部',
    baseSalary: 25000,
    bonus: '3-6个月',
    benefits: ['五险一金', '年度体检', '带薪年假', '培训津贴'],
    startDate: '2024-03-01',
    probationPeriod: '3个月',
    workLocation: '上海市浦东新区',
    workType: '全职',
    status: 'sent',
    sentDate: '2024-01-20',
    expiryDate: '2024-01-27',
    respondedDate: null,
    notes: '候选人技术能力优秀，团队协作能力强，期望薪资与公司预算相符。',
    offerDetails: {
      title: '高级前端工程师',
      level: 'P6',
      reportingTo: '技术总监',
      responsibilities: [
        '负责前端架构设计和技术选型',
        '参与产品需求分析和技术方案制定', 
        '指导初级工程师完成开发任务',
        '优化产品性能和用户体验'
      ]
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'default'
      case 'sent': return 'secondary' 
      case 'rejected': return 'destructive'
      case 'expired': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted': return '已接受'
      case 'sent': return '已发送'
      case 'rejected': return '已拒绝'
      case 'expired': return '已过期'
      default: return '未知'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4" />
      case 'sent': return <Clock className="h-4 w-4" />
      case 'rejected': return <AlertCircle className="h-4 w-4" />
      case 'expired': return <AlertCircle className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader 
          title={`Offer 详情 - ${offer.candidate}`} 
          description={`${offer.position} • ${offer.department}`}
        >
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            下载 Offer
          </Button>
          {offer.status === 'sent' && (
            <Button>
              <Send className="mr-2 h-4 w-4" />
              重新发送
            </Button>
          )}
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-5xl">
            {/* 状态概览 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      <User className="h-8 w-8 text-secondary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{offer.candidate}</h2>
                      <p className="text-muted-foreground">{offer.position} • {offer.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusColor(offer.status)} className="mb-2">
                      {getStatusIcon(offer.status)}
                      <span className="ml-1">{getStatusText(offer.status)}</span>
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      发送时间: {offer.sentDate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      截止时间: {offer.expiryDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 薪酬信息 */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    薪酬待遇
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">基本月薪</span>
                    <span className="text-2xl font-bold text-primary">¥{offer.baseSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">年终奖</span>
                    <span className="font-medium">{offer.bonus}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm text-muted-foreground mb-2">福利待遇</div>
                    <div className="flex flex-wrap gap-1">
                      {offer.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    工作安排
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">入职时间</span>
                    <span className="font-medium">{offer.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">试用期</span>
                    <span className="font-medium">{offer.probationPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">工作地点</span>
                    <span className="font-medium">{offer.workLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">工作类型</span>
                    <Badge variant="outline">{offer.workType}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 职位详情 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  职位详情
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">职位名称</div>
                    <div className="font-medium">{offer.offerDetails.title}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">职位级别</div>
                    <Badge variant="secondary">{offer.offerDetails.level}</Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">汇报对象</div>
                    <div className="font-medium">{offer.offerDetails.reportingTo}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-3">主要职责</div>
                  <ul className="space-y-2 text-sm">
                    {offer.offerDetails.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 备注信息 */}
            <Card>
              <CardHeader>
                <CardTitle>备注信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground">{offer.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex gap-3 pt-4">
              {offer.status === 'sent' && (
                <>
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    重新发送
                  </Button>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    修改 Offer
                  </Button>
                  <Button variant="outline">
                    催办提醒
                  </Button>
                </>
              )}
              {offer.status === 'accepted' && (
                <Button>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  安排入职
                </Button>
              )}
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                下载 PDF
              </Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="offer-detail" />
    </div>
  )
}
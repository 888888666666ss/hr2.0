'use client'

import { useParams, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Edit, Heart, Users, Trophy, Coffee, Calendar, MapPin, Image, Share2 } from 'lucide-react'

export default function CultureDetailPage() {
  const params = useParams()
  const router = useRouter()
  const cultureId = params.id

  // 模拟数据，实际应从API获取
  const cultureDetail = {
    id: cultureId,
    title: '2024年会盛典',
    type: '年度活动',
    date: '2024-02-01',
    location: '上海国际会议中心',
    participants: 280,
    organizer: 'HR部门',
    status: 'completed',
    description: '2024年度公司年会盛典，全体员工共同庆祝过去一年的成就，展望新年发展目标。活动包含精彩表演、抽奖环节、优秀员工表彰等丰富内容。',
    highlights: [
      '总裁新年致辞',
      '各部门精彩表演',
      '年度优秀员工表彰',
      '丰厚奖品抽奖',
      '团队建设游戏'
    ],
    gallery: [
      { 
        url: '/company-annual-meeting.jpg', 
        title: '年会现场',
        description: '全体员工齐聚一堂'
      },
      { 
        url: '/team-building-outdoor.jpg', 
        title: '精彩表演',
        description: '各部门员工才艺展示'
      },
      { 
        url: '/tech-conference-presentation.png', 
        title: '颁奖典礼',
        description: '年度优秀员工表彰'
      }
    ],
    awards: [
      { category: '年度优秀员工', winners: ['张三', '李四', '王五'] },
      { category: '最佳团队协作奖', winners: ['技术部'] },
      { category: '创新突破奖', winners: ['产品部'] },
      { category: '最佳新人奖', winners: ['赵六', '孙七'] }
    ],
    feedback: [
      {
        name: '张三',
        department: '技术部',
        comment: '年会活动非常精彩，感受到了公司大家庭的温暖，期待下次活动！',
        rating: 5
      },
      {
        name: '李四',
        department: '产品部', 
        comment: '表演节目很有趣，抽奖环节也很刺激，整体体验很好。',
        rating: 5
      },
      {
        name: '王五',
        department: '设计部',
        comment: '组织得很用心，每个环节都很精彩，公司文化氛围很好。',
        rating: 4
      }
    ],
    relatedValues: [
      {
        title: '团队协作',
        description: '我们相信团队的力量，鼓励开放沟通，共同成长',
        icon: Users,
        color: 'bg-blue-500'
      },
      {
        title: '追求卓越',
        description: '持续创新，追求卓越，永不止步',
        icon: Trophy,
        color: 'bg-yellow-500'
      },
      {
        title: '工作生活平衡',
        description: '注重员工身心健康，提供灵活的工作环境',
        icon: Coffee,
        color: 'bg-green-500'
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'ongoing': return 'secondary'
      case 'planned': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'ongoing': return '进行中'
      case 'planned': return '计划中'
      default: return '未知'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader 
          title={cultureDetail.title} 
          description={`${cultureDetail.type} • ${cultureDetail.date}`}
        >
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            分享
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            编辑活动
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-6xl">
            {/* 活动概览 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{cultureDetail.title}</h2>
                    <p className="text-muted-foreground mb-4">{cultureDetail.description}</p>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{cultureDetail.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{cultureDetail.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{cultureDetail.participants} 人参与</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">主办: {cultureDetail.organizer}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(cultureDetail.status)}>
                    {getStatusText(cultureDetail.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* 活动亮点 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  活动亮点
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {cultureDetail.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 活动相册 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  活动相册
                </CardTitle>
                <CardDescription>精彩瞬间回顾</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {cultureDetail.gallery.map((photo, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={photo.url || "/placeholder.svg"}
                        alt={photo.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-1">{photo.title}</h4>
                        <p className="text-sm text-muted-foreground">{photo.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 获奖名单 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  表彰获奖
                </CardTitle>
                <CardDescription>年度优秀员工和团队表彰</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {cultureDetail.awards.map((award, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-lg flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        {award.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {award.winners.map((winner, winnerIndex) => (
                          <Badge key={winnerIndex} variant="secondary">
                            {winner}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 相关价值观 */}
            <Card>
              <CardHeader>
                <CardTitle>体现的企业价值观</CardTitle>
                <CardDescription>此次活动体现的核心企业文化</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {cultureDetail.relatedValues.map((value, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${value.color}`}>
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">{value.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 员工反馈 */}
            <Card>
              <CardHeader>
                <CardTitle>员工反馈</CardTitle>
                <CardDescription>参与员工的真实感受和建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cultureDetail.feedback.map((feedback, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{feedback.name}</div>
                          <div className="text-sm text-muted-foreground">{feedback.department}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(feedback.rating)}
                        </div>
                      </div>
                      <p className="text-sm bg-muted p-3 rounded">
                        "{feedback.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex gap-3 pt-4">
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                编辑活动
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                分享链接
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                下载报告
              </Button>
              <Button variant="outline">
                <Image className="mr-2 h-4 w-4" />
                查看更多照片
              </Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="culture-detail" />
    </div>
  )
}
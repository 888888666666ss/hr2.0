'use client'

import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Users, Trophy, Coffee, Eye } from 'lucide-react'

const cultureItems = [
  {
    title: '团队协作',
    description: '我们相信团队的力量，鼓励开放沟通，共同成长',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: '用户至上',
    description: '始终以用户需求为导向，提供优质的产品和服务',
    icon: Heart,
    color: 'bg-red-500',
  },
  {
    title: '追求卓越',
    description: '持续创新，追求卓越，永不止步',
    icon: Trophy,
    color: 'bg-yellow-500',
  },
  {
    title: '工作生活平衡',
    description: '注重员工身心健康，提供灵活的工作环境',
    icon: Coffee,
    color: 'bg-green-500',
  },
]

const events = [
  {
    id: 1,
    title: '2024年会盛典',
    date: '2024-02-01',
    image: '/company-annual-meeting.jpg',
    description: '精彩的年会表演和抽奖活动',
  },
  {
    id: 2,
    title: '团队建设活动',
    date: '2023-12-15',
    image: '/team-building-outdoor.jpg',
    description: '户外拓展训练，增强团队凝聚力',
  },
  {
    id: 3,
    title: '技术分享会',
    date: '2023-11-20',
    image: '/tech-conference-presentation.png',
    description: '前沿技术探讨与经验分享',
  },
]

export default function CulturePage() {
  const router = useRouter()

  const handleViewEvent = (eventId: number) => {
    router.push(`/culture/${eventId}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="企业文化"
        description="了解公司文化价值观和团队活动"
      />

      <div className="flex-1 space-y-8 p-6">
        {/* Core Values */}
        <section>
          <h2 className="text-2xl font-bold mb-6">核心价值观</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cultureItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.color} mb-4`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Events */}
        <section>
          <h2 className="text-2xl font-bold mb-6">精彩活动</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewEvent(event.id)}
                      >
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        查看详情
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm leading-relaxed">{event.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-bold mb-6">员工福利</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">五险一金</div>
                    <div className="text-sm text-muted-foreground">完善的社保公积金</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Coffee className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">弹性工作</div>
                    <div className="text-sm text-muted-foreground">灵活的工作时间</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">带薪年假</div>
                    <div className="text-sm text-muted-foreground">充足的休假时间</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">团建活动</div>
                    <div className="text-sm text-muted-foreground">定期团队建设</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">健康体检</div>
                    <div className="text-sm text-muted-foreground">年度健康检查</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">技能培训</div>
                    <div className="text-sm text-muted-foreground">持续学习成长</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

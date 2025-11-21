'use client'

import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'

export default function OffersPage() {
  const router = useRouter()

  const handleCreateOffer = () => {
    router.push('/offers/new')
  }

  const handleViewOffer = (offerId: number) => {
    router.push(`/offers/${offerId}`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="Offer 管理" description="生成和管理录用通知">
          <Button onClick={handleCreateOffer}>生成 Offer</Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {[
              {
                id: 1,
                candidate: '张三',
                position: '高级前端工程师',
                salary: '25k-40k',
                status: 'sent',
                date: '2024-01-20',
              },
              {
                id: 2,
                candidate: '李四',
                position: '产品经理',
                salary: '20k-30k',
                status: 'accepted',
                date: '2024-01-18',
              },
            ].map((offer) => (
              <Card key={offer.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                      <FileText className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {offer.candidate} - {offer.position}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        薪资：{offer.salary} • 发送时间：{offer.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        offer.status === 'accepted' ? 'default' : 'secondary'
                      }
                    >
                      {offer.status === 'sent' ? '已发送' : '已接受'}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => handleViewOffer(offer.id)}>
                      查看详情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <AIAssistant page="offers" />
    </div>
  )
}

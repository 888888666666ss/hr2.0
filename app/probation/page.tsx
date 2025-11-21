'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Eye, CheckCircle, Clock } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const mockProbations = [
  {
    id: 1,
    name: '张三',
    position: '前端工程师',
    department: '技术部',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    daysLeft: 45,
    status: 'active',
    mentor: '李经理',
    performance: '良好',
  },
  {
    id: 2,
    name: '李四',
    position: '产品经理',
    department: '产品部',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    daysLeft: 61,
    status: 'active',
    mentor: '周总监',
    performance: '优秀',
  },
  {
    id: 3,
    name: '王五',
    position: 'UI设计师',
    department: '设计部',
    startDate: '2023-12-01',
    endDate: '2024-03-01',
    daysLeft: -15,
    status: 'pending',
    mentor: '孙经理',
    performance: '良好',
  },
]

export default function ProbationPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredProbations = mockProbations.filter(prob => {
    const matchesSearch = prob.name.includes(searchTerm) || prob.position.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || prob.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewProbation = (probationId: number) => {
    router.push(`/probation/${probationId}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="试用期转正"
        description="管理员工试用期考核和转正流程"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>试用期员工</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>即将到期</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>待转正审批</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>本月已转正</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">5</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索员工姓名或岗位..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="状态筛选" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="active">试用期中</SelectItem>
              <SelectItem value="pending">待转正审批</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Probation List */}
        <div className="space-y-4">
          {filteredProbations.map((probation) => (
            <Card key={probation.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-medium text-primary">
                        {probation.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{probation.name}</h3>
                        <Badge variant={probation.status === 'active' ? 'default' : 'secondary'}>
                          {probation.status === 'active' ? '试用期中' : '待转正'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{probation.position}</span>
                        <span>•</span>
                        <span>{probation.department}</span>
                        <span>•</span>
                        <span>导师: {probation.mentor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">试用期</div>
                      <div className="text-sm font-medium">
                        {probation.startDate} ~ {probation.endDate}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">剩余天数</div>
                      <div className={cn(
                        'text-lg font-bold',
                        probation.daysLeft < 0 ? 'text-red-600' :
                        probation.daysLeft < 30 ? 'text-orange-600' : ''
                      )}>
                        {probation.daysLeft < 0 ? '已到期' : `${probation.daysLeft}天`}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">考核评价</div>
                      <Badge variant="outline">{probation.performance}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewProbation(probation.id)}>
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        查看详情
                      </Button>
                      {probation.daysLeft <= 0 && (
                        <Button size="sm" onClick={() => alert(`提交 ${probation.name} 的转正申请...\n功能开发中`)}>
                          <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                          提交转正
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

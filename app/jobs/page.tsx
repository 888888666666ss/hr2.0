'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, MoreVertical, Users, Eye } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  
  const allJobs = [
    {
      id: 1,
      title: '高级前端工程师',
      department: '技术部',
      location: '北京',
      type: '全职',
      status: 'active',
      applicants: 45,
      views: 1203,
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: '产品经理',
      department: '产品部',
      location: '上海',
      type: '全职',
      status: 'active',
      applicants: 32,
      views: 892,
      createdAt: '2024-01-18',
    },
    {
      id: 3,
      title: 'UI 设计师',
      department: '设计部',
      location: '深圳',
      type: '全职',
      status: 'active',
      applicants: 28,
      views: 756,
      createdAt: '2024-01-20',
    },
    {
      id: 4,
      title: '后端工程师',
      department: '技术部',
      location: '北京',
      type: '全职',
      status: 'paused',
      applicants: 12,
      views: 445,
      createdAt: '2024-01-10',
    },
  ]

  const filteredJobs = allJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFilter = () => {
    setShowFilter(!showFilter)
    alert('筛选条件功能将在此处实现')
  }

  const handleMoreOptions = (jobId: number) => {
    alert(`岗位 ${jobId} 的更多选项功能将在此处实现`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="岗位管理" description="管理和发布招聘岗位">
          <Button asChild>
            <Link href="/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              新建岗位
            </Link>
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="搜索岗位名称、部门..."
                    className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={handleFilter}>筛选条件</Button>
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link href={`/jobs/${job.id}`}>
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                            {job.title}
                          </h3>
                        </Link>
                        <Badge
                          variant={
                            job.status === 'active' ? 'default' : 'secondary'
                          }
                        >
                          {job.status === 'active' ? '招聘中' : '已暂停'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>发布于 {job.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{job.applicants} 位申请者</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{job.views} 次浏览</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>查看详情</Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleMoreOptions(job.id)}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <AIAssistant page="jobs" />
    </div>
  )
}

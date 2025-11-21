'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Plus, Search, Filter, Download, Users, Calendar, MoreVertical, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getJobReqs, createJobReq, type JobReq, type JobReqResponse } from '@/lib/api/job-reqs'

export default function JobReqsPage() {
  const [showNewModal, setShowNewModal] = useState(false)
  const [selectedReqs, setSelectedReqs] = useState<number[]>([])
  const [jobReqs, setJobReqs] = useState<JobReqResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    loadJobReqs()
  }, [statusFilter, searchTerm])

  const loadJobReqs = async () => {
    try {
      setLoading(true)
      const data = await getJobReqs(statusFilter || undefined)
      
      // Apply search filter
      let filteredData = data
      if (searchTerm) {
        filteredData = data.filter(req => 
          req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.hiring_manager.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      setJobReqs(filteredData)
    } catch (error) {
      console.error('Failed to load job requisitions:', error)
      // Fallback to mock data if API fails
      let mockData = getMockData()
      if (searchTerm) {
        mockData = mockData.filter(req => 
          req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.hiring_manager.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      setJobReqs(mockData)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitJobReq = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const channels = formData.getAll('channels') as string[]

    const newJobReq: JobReq = {
      title: formData.get('title') as string,
      department: formData.get('department') as string,
      hiring_manager: formData.get('hiring_manager') as string,
      headcount: parseInt(formData.get('headcount') as string),
      jd: formData.get('jd') as string,
      channels: channels,
      close_date: formData.get('close_date') as string,
    }

    try {
      await createJobReq(newJobReq)
      setShowNewModal(false)
      loadJobReqs() // Reload the list
      alert('需求已提交，等待审批')
    } catch (error) {
      console.error('Failed to create job requisition:', error)
      alert('提交失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  // Mock data fallback
  const getMockData = (): JobReqResponse[] => [
    {
      id: 1,
      title: '高级前端工程师',
      department: '技术部',
      hiring_manager: '张经理',
      headcount: 2,
      jd: '负责前端开发',
      channels: ['智联招聘', 'Boss直聘'],
      close_date: '2024-03-15',
      status: 'Open',
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
      applicants_count: 45,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'default'
      case 'Pending Approval':
        return 'secondary'
      case 'Draft':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const toggleSelection = (id: number) => {
    setSelectedReqs(prev =>
      prev.includes(id) ? prev.filter(reqId => reqId !== id) : [...prev, id]
    )
  }

  const handleExport = () => {
    alert('正在导出岗位需求数据...\n功能开发中')
  }

  const handleMoreFilter = () => {
    alert('高级筛选功能开发中...\n将支持按部门、状态、日期等多维度筛选')
  }

  const handleBatchPublish = () => {
    alert(`正在批量发布 ${selectedReqs.length} 个岗位需求...\n功能开发中`)
  }

  const handleBatchClose = () => {
    alert(`正在批量关闭 ${selectedReqs.length} 个岗位需求...\n功能开发中`)
  }

  const handleApproval = (reqId: number) => {
    alert(`正在处理岗位需求 ${reqId} 的审批...\n功能开发中`)
  }

  const handleMoreOptions = (reqId: number) => {
    alert(`岗位需求 ${reqId} 的更多操作：\n- 复制需求\n- 暂停招聘\n- 删除需求\n功能开发中`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="岗位需求" description="管理招聘需求和审批流程">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            导出
          </Button>
          <Button onClick={() => setShowNewModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            新建需求
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto bg-muted/30 p-8">
          {/* Search and Filters */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="搜索岗位标题、部门、地点..."
                    className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">全部状态</option>
                  <option value="Open">Open</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Draft">Draft</option>
                  <option value="Closed">Closed</option>
                </select>
                <Button variant="outline" className="gap-2" onClick={handleMoreFilter}>
                  <Filter className="h-4 w-4" />
                  更多筛选
                </Button>
              </div>
              
              {selectedReqs.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-accent/50 px-4 py-3">
                  <span className="text-sm font-medium text-foreground">
                    已选择 {selectedReqs.length} 项
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleBatchPublish}>批量发布</Button>
                    <Button size="sm" variant="outline" onClick={handleBatchClose}>批量关闭</Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedReqs([])}>
                      取消选择
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Requisitions Table */}
          <Card className="shadow-sm">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-3 text-sm text-muted-foreground">加载中...</p>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-input"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedReqs(jobReqs.map(req => req.id))
                            } else {
                              setSelectedReqs([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>岗位标题</TableHead>
                      <TableHead>部门</TableHead>
                      <TableHead>负责人</TableHead>
                      <TableHead className="text-center">HC</TableHead>
                      <TableHead className="text-center">申请人数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>截止日期</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {jobReqs.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-input"
                            checked={selectedReqs.includes(req.id)}
                            onChange={() => toggleSelection(req.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Link 
                            href={`/job-reqs/${req.id}`} 
                            className="font-medium text-foreground transition-colors hover:text-primary"
                          >
                            {req.title}
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{req.department}</TableCell>
                        <TableCell className="text-muted-foreground">{req.hiring_manager}</TableCell>
                        <TableCell className="text-center font-medium">{req.headcount}</TableCell>
                        <TableCell className="text-center">
                          <div className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>{req.applicants_count || 0}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(req.status)}>
                            {req.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{req.close_date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/job-reqs/${req.id}`}>查看</Link>
                            </Button>
                            {req.status === 'Pending Approval' && (
                              <Button variant="outline" size="sm" onClick={() => handleApproval(req.id)}>审批</Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleMoreOptions(req.id)}>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* New Job Requisition Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">新建岗位需求</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => setShowNewModal(false)}
                >
                  ✕
                </Button>
              </div>
              
              <form className="space-y-5" onSubmit={handleSubmitJobReq}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      岗位标题 <span className="text-destructive">*</span>
                    </label>
                    <input 
                      name="title" 
                      type="text" 
                      required 
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20" 
                      placeholder="例如：高级前端工程师" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      部门 <span className="text-destructive">*</span>
                    </label>
                    <select 
                      name="department" 
                      required 
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    >
                      <option value="">选择部门</option>
                      <option>技术部</option>
                      <option>产品部</option>
                      <option>设计部</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      招聘负责人 <span className="text-destructive">*</span>
                    </label>
                    <input 
                      name="hiring_manager" 
                      type="text" 
                      required 
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20" 
                      placeholder="选择负责人" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      招聘人数 <span className="text-destructive">*</span>
                    </label>
                    <input 
                      name="headcount" 
                      type="number" 
                      required 
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20" 
                      placeholder="1" 
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    岗位描述 <span className="text-destructive">*</span>
                  </label>
                  <textarea 
                    name="jd" 
                    required 
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20" 
                    rows={4} 
                    placeholder="请输入岗位职责和要求..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">发布渠道</label>
                  <div className="flex flex-wrap gap-2">
                    {['智联招聘', '前程无忧', 'Boss直聘', '拉勾网'].map((channel) => (
                      <label 
                        key={channel}
                        className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 transition-colors hover:bg-accent"
                      >
                        <input type="checkbox" name="channels" value={channel} className="h-4 w-4 rounded" />
                        <span className="text-sm">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    截止日期 <span className="text-destructive">*</span>
                  </label>
                  <input 
                    name="close_date" 
                    type="date" 
                    required 
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20" 
                  />
                </div>

                <div className="flex justify-end gap-3 border-t border-border pt-5">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowNewModal(false)} 
                    disabled={submitting}
                  >
                    取消
                  </Button>
                  <Button type="submit" disabled={submitting} className="gap-2">
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        提交中...
                      </>
                    ) : (
                      '提交审批'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <AIAssistant page="job-reqs" />
    </div>
  )
}

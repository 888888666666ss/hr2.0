'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Search, Filter, Download, Mail, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  
  const allEmployees = [
    {
      id: 1,
      name: '张伟',
      position: '前端技术专家',
      department: '技术部',
      email: 'zhangwei@company.com',
      phone: '138-0000-0001',
      status: 'active',
      joinDate: '2020-03-15',
    },
    {
      id: 2,
      name: '李娜',
      position: '高级产品经理',
      department: '产品部',
      email: 'lina@company.com',
      phone: '138-0000-0002',
      status: 'active',
      joinDate: '2021-06-20',
    },
    {
      id: 3,
      name: '王强',
      position: 'UI 设计主管',
      department: '设计部',
      email: 'wangqiang@company.com',
      phone: '138-0000-0003',
      status: 'active',
      joinDate: '2019-12-01',
    },
    {
      id: 4,
      name: '刘洋',
      position: '后端工程师',
      department: '技术部',
      email: 'liuyang@company.com',
      phone: '138-0000-0004',
      status: 'active',
      joinDate: '2022-01-10',
    },
  ]

  const filteredEmployees = allEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExport = () => {
    alert('导出员工数据功能将在此处实现')
  }

  const handleFilter = () => {
    setShowFilter(!showFilter)
    alert('筛选功能将在此处实现')
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="员工档案库" description="管理在职员工信息">
          <Button variant="outline" className="gap-2" onClick={handleFilter}>
            <Filter className="h-4 w-4" />
            筛选
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            导出
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto bg-muted/30 p-8">
          {/* Stats */}
          <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: '在职员工', value: '487' },
              { label: '本月入职', value: '12' },
              { label: '本月离职', value: '3' },
              { label: '离职率', value: '2.5%' },
            ].map((stat) => (
              <Card key={stat.label} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索员工姓名、部门、岗位..."
                  className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <tr>
                    <TableHead>员工</TableHead>
                    <TableHead>岗位</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>联系方式</TableHead>
                    <TableHead>入职日期</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </tr>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {employee.name[0]}
                          </div>
                          <div className="font-medium text-foreground">
                            {employee.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {employee.position}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {employee.department}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{employee.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{employee.joinDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">在职</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/employees/${employee.id}`}>查看详情</Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      <AIAssistant page="employees" />
    </div>
  )
}

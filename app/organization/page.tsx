'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Edit, Users, ChevronRight, ChevronDown } from 'lucide-react'

interface DepartmentNode {
  id: string
  name: string
  leader: string
  count: number
  children?: DepartmentNode[]
}

const orgData: DepartmentNode = {
  id: '1',
  name: '公司总部',
  leader: '张总',
  count: 156,
  children: [
    {
      id: '2',
      name: '技术部',
      leader: '李经理',
      count: 45,
      children: [
        { id: '21', name: '前端组', leader: '王主管', count: 15 },
        { id: '22', name: '后端组', leader: '赵主管', count: 20 },
        { id: '23', name: 'AI组', leader: '刘主管', count: 10 },
      ]
    },
    {
      id: '3',
      name: '产品部',
      leader: '周经理',
      count: 23,
      children: [
        { id: '31', name: 'B端产品组', leader: '吴主管', count: 12 },
        { id: '32', name: 'C端产品组', leader: '郑主管', count: 11 },
      ]
    },
    {
      id: '4',
      name: '设计部',
      leader: '孙经理',
      count: 18,
    },
    {
      id: '5',
      name: '销售部',
      leader: '陈经理',
      count: 35,
    },
    {
      id: '6',
      name: '人力资源部',
      leader: '黄经理',
      count: 12,
    },
    {
      id: '7',
      name: '财务部',
      leader: '杨经理',
      count: 8,
    },
  ]
}

function DepartmentTree({ node, level = 0 }: { node: DepartmentNode; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="space-y-1">
      <div
        className={cn(
          'group flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors cursor-pointer',
          level === 0 ? 'bg-primary/5' : ''
        )}
        style={{ marginLeft: `${level * 24}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )
        ) : (
          <div className="w-4" />
        )}

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{node.name}</span>
            <span className="text-xs text-muted-foreground">({node.count}人)</span>
          </div>
          <div className="text-sm text-muted-foreground">负责人: {node.leader}</div>
        </div>

        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {node.children!.map((child) => (
            <DepartmentTree key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function OrganizationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="组织架构"
        description="查看和管理公司组织架构，编辑部门信息"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">公司架构图</h2>
            <p className="text-sm text-muted-foreground mt-1">全公司共 {orgData.count} 人</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            添加部门
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <DepartmentTree node={orgData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

'use client'

import { PageHeader } from '@/components/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Circle, Eye } from 'lucide-react'

const handoverItems = [
  {
    category: '工作交接',
    items: [
      { task: '项目文档整理', status: 'completed', assignee: '张三' },
      { task: '代码仓库权限交接', status: 'completed', assignee: '张三' },
      { task: '客户资料移交', status: 'pending', assignee: '李四' },
      { task: '工作进度说明', status: 'pending', assignee: '李四' },
    ]
  },
  {
    category: '物品归还',
    items: [
      { task: '工作电脑归还', status: 'completed', assignee: 'IT部门' },
      { task: '门禁卡归还', status: 'completed', assignee: '行政部' },
      { task: '办公用品清点', status: 'pending', assignee: '行政部' },
    ]
  },
  {
    category: '财务结算',
    items: [
      { task: '工资结算确认', status: 'pending', assignee: '财务部' },
      { task: '报销单据提交', status: 'pending', assignee: '财务部' },
    ]
  },
]

export default function HandoverPage() {
  const totalItems = handoverItems.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = handoverItems.reduce(
    (sum, cat) => sum + cat.items.filter(item => item.status === 'completed').length,
    0
  )
  const progress = Math.round((completedItems / totalItems) * 100)

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="交接清单"
        description="离职员工工作交接进度跟踪"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Progress Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">离职员工: 王五 (UI设计师)</h3>
                <p className="text-sm text-muted-foreground">预计离职日期: 2024-02-15</p>
              </div>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                查看详情
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">交接进度</span>
                <span className="font-medium">{completedItems} / {totalItems} 项已完成</span>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">{progress}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Handover Checklist */}
        <div className="space-y-6">
          {handoverItems.map((category, catIndex) => (
            <Card key={catIndex}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {item.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <div className={cn(
                            'font-medium',
                            item.status === 'completed' ? 'text-muted-foreground line-through' : ''
                          )}>
                            {item.task}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            交接对象: {item.assignee}
                          </div>
                        </div>
                      </div>
                      <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                        {item.status === 'completed' ? '已完成' : '待完成'}
                      </Badge>
                    </div>
                  ))}
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

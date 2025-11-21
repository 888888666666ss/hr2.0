import { NextRequest, NextResponse } from 'next/server'

// 模拟数据（与 route.ts 中的相同）
const mockJobReqs = [
  {
    id: 1,
    title: '高级前端工程师',
    department: '技术部',
    hiring_manager: '张经理',
    headcount: 2,
    jd: '负责公司核心产品的前端开发工作，要求3年以上经验',
    channels: ['BOSS直聘', '智联招聘'],
    close_date: '2024-03-15',
    location: '北京',
    level: '高级',
    salary_range: '25-40K',
    priority: 'high',
    status: 'Open',
    created_at: '2024-01-20T10:30:00Z',
    updated_at: '2024-01-20T10:30:00Z',
    applicants_count: 45
  },
  {
    id: 2,
    title: '产品经理',
    department: '产品部',
    hiring_manager: '李总监',
    headcount: 1,
    jd: '负责产品规划和需求管理，与技术团队协作推进产品开发',
    channels: ['拉勾网', '猎聘'],
    close_date: '2024-03-20',
    location: '上海',
    level: '中级',
    salary_range: '20-30K',
    priority: 'medium',
    status: 'Open',
    created_at: '2024-01-18T14:20:00Z',
    updated_at: '2024-01-19T09:15:00Z',
    applicants_count: 32
  },
  {
    id: 3,
    title: 'UI 设计师',
    department: '设计部',
    hiring_manager: '王主管',
    headcount: 1,
    jd: '负责产品界面设计和用户体验优化，制定设计规范',
    channels: ['BOSS直聘'],
    close_date: '2024-03-25',
    location: '深圳',
    level: '中级',
    salary_range: '15-25K',
    priority: 'medium',
    status: 'Pending Approval',
    created_at: '2024-01-17T11:45:00Z',
    updated_at: '2024-01-20T16:30:00Z',
    applicants_count: 28
  },
  {
    id: 4,
    title: '后端工程师',
    department: '技术部',
    hiring_manager: '张经理',
    headcount: 3,
    jd: '负责后端服务开发和架构设计，维护微服务系统',
    channels: ['智联招聘', '前程无忧'],
    close_date: '2024-04-01',
    location: '北京',
    level: '高级',
    salary_range: '25-45K',
    priority: 'low',
    status: 'Draft',
    created_at: '2024-01-22T08:00:00Z',
    updated_at: '2024-01-22T08:00:00Z',
    applicants_count: 0
  }
]

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteParams) {
  const params = await context.params
  try {
    const id = parseInt(params.id)
    
    const jobReq = mockJobReqs.find(req => req.id === id)
    
    if (!jobReq) {
      return NextResponse.json(
        { error: 'Job requisition not found' },
        { status: 404 }
      )
    }
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 150))
    
    return NextResponse.json(jobReq)
  } catch (error) {
    console.error('Error fetching job req:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job requisition' },
      { status: 500 }
    )
  }
}
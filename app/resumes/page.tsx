'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Search, Filter, Sparkles, Eye, X, FileText, Brain } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface Resume {
  id: number
  name: string
  position: string
  experience: string
  education: string
  score: number
  status: string
  uploadedAt: string
  phone?: string
  email?: string
  skills?: string[]
  summary?: string
  workHistory?: string
}

export default function ResumesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const allResumes = [
    {
      id: 1,
      name: '张三',
      position: '高级前端工程师',
      experience: '5年',
      education: '本科',
      score: 92,
      status: 'pending',
      uploadedAt: '2024-01-20 14:30',
      phone: '138-0000-0001',
      email: 'zhangsan@email.com',
      skills: ['React', 'Vue', 'TypeScript', 'Node.js'],
      summary: '具有5年前端开发经验，熟练掌握React、Vue等主流框架，有丰富的大型项目开发经验。',
      workHistory: '2019-2024: 腾讯 - 高级前端工程师\n2017-2019: 阿里巴巴 - 前端工程师',
    },
    {
      id: 2,
      name: '李四',
      position: '产品经理',
      experience: '3年',
      education: '硕士',
      score: 88,
      status: 'analyzed',
      uploadedAt: '2024-01-20 11:20',
      phone: '138-0000-0002',
      email: 'lisi@email.com',
      skills: ['产品规划', 'Axure', 'Figma', '数据分析'],
      summary: '3年产品经验，负责过多个B端产品的设计和规划，擅长用户需求分析。',
      workHistory: '2021-2024: 字节跳动 - 产品经理\n2020-2021: 美团 - 产品助理',
    },
    {
      id: 3,
      name: '王五',
      position: 'UI 设计师',
      experience: '4年',
      education: '本科',
      score: 85,
      status: 'interviewed',
      uploadedAt: '2024-01-19 16:45',
    },
    {
      id: 4,
      name: '赵六',
      position: '后端工程师',
      experience: '6年',
      education: '本科',
      score: 90,
      status: 'analyzed',
      uploadedAt: '2024-01-19 10:15',
    },
  ]

  const filteredResumes = allResumes.filter(resume =>
    resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFilter = () => {
    setShowFilter(!showFilter)
    alert('筛选功能将在此处实现')
  }

  const handleViewDetails = (resume: Resume) => {
    setSelectedResume(resume)
    setIsDetailOpen(true)
  }

  const handleAIAnalysis = (resume: Resume) => {
    setSelectedResume(resume)
    setIsAnalysisOpen(true)
    setIsAnalyzing(true)
    
    // 模拟AI分析过程
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="简历人才库" description="管理和分析候选人简历">
          <Button variant="outline" onClick={handleFilter}>
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
          <Button asChild>
            <Link href="/resumes/upload">
              <Upload className="mr-2 h-4 w-4" />
              上传简历
            </Link>
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索候选人姓名、岗位、技能..."
                  className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Resumes Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResumes.map((resume) => (
              <Card
                key={resume.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {resume.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {resume.position}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">
                        {resume.score}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">工作经验</span>
                      <span className="text-foreground">{resume.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">学历</span>
                      <span className="text-foreground">{resume.education}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant={
                        resume.status === 'analyzed'
                          ? 'default'
                          : resume.status === 'interviewed'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {resume.status === 'pending'
                        ? '待分析'
                        : resume.status === 'analyzed'
                        ? '已分析'
                        : '已面试'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {resume.uploadedAt}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetails(resume)}
                    >
                      查看详情
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAIAnalysis(resume)}
                    >
                      <Sparkles className="mr-1 h-3 w-3" />
                      AI分析
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <AIAssistant page="resumes" />

      {/* Resume Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>简历详情</DialogTitle>
            <DialogDescription>查看候选人的详细信息</DialogDescription>
          </DialogHeader>
          {selectedResume && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>姓名</Label>
                  <div className="text-sm font-medium">{selectedResume.name}</div>
                </div>
                <div className="space-y-2">
                  <Label>应聘岗位</Label>
                  <div className="text-sm font-medium">{selectedResume.position}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>工作经验</Label>
                  <div className="text-sm font-medium">{selectedResume.experience}</div>
                </div>
                <div className="space-y-2">
                  <Label>学历</Label>
                  <div className="text-sm font-medium">{selectedResume.education}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>联系电话</Label>
                  <div className="text-sm font-medium">{selectedResume.phone || '138-xxxx-xxxx'}</div>
                </div>
                <div className="space-y-2">
                  <Label>邮箱</Label>
                  <div className="text-sm font-medium">{selectedResume.email || 'xxx@email.com'}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>技能标签</Label>
                <div className="flex flex-wrap gap-2">
                  {(selectedResume.skills || ['React', 'Vue', 'JavaScript']).map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>个人简介</Label>
                <div className="text-sm p-3 bg-muted rounded-lg">
                  {selectedResume.summary || '具有丰富的工作经验，技术能力强，学习能力佳。'}
                </div>
              </div>
              <div className="space-y-2">
                <Label>工作经历</Label>
                <div className="text-sm p-3 bg-muted rounded-lg whitespace-pre-line">
                  {selectedResume.workHistory || '2020-2024: 某公司 - 相关岗位\n负责项目开发和维护工作'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>简历评分</Label>
                  <div className="text-2xl font-bold text-primary">{selectedResume.score}</div>
                </div>
                <Badge variant={
                  selectedResume.status === 'analyzed'
                    ? 'default'
                    : selectedResume.status === 'interviewed'
                    ? 'secondary'
                    : 'outline'
                }>
                  {selectedResume.status === 'pending'
                    ? '待分析'
                    : selectedResume.status === 'analyzed'
                    ? '已分析'
                    : '已面试'}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              关闭
            </Button>
            <Button onClick={() => {
              setIsDetailOpen(false)
              selectedResume && handleAIAnalysis(selectedResume)
            }}>
              <Brain className="mr-2 h-4 w-4" />
              AI分析
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Analysis Dialog */}
      <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI 简历分析</DialogTitle>
            <DialogDescription>
              {isAnalyzing ? '正在分析简历...' : `${selectedResume?.name} 的简历分析报告`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Brain className="h-12 w-12 animate-pulse text-primary mb-4" />
                <div className="text-sm text-muted-foreground">AI正在分析简历内容...</div>
                <div className="mt-2 text-xs text-muted-foreground">预计需要3秒</div>
              </div>
            ) : selectedResume && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">综合评分</h4>
                    <div className="text-2xl font-bold text-primary">{selectedResume.score}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>技能匹配度</Label>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">85% - 技能高度匹配岗位要求</div>
                  </div>

                  <div className="space-y-2">
                    <Label>经验匹配度</Label>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">90% - 工作经验与岗位要求匹配</div>
                  </div>

                  <div className="space-y-2">
                    <Label>教育背景匹配度</Label>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">80% - 教育背景符合基本要求</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>AI 分析结论</Label>
                  <div className="text-sm p-3 bg-muted rounded-lg">
                    该候选人具备{selectedResume.experience}工作经验，技能栈与{selectedResume.position}岗位高度匹配。
                    建议进入下一轮面试环节。主要优势：技术能力强、项目经验丰富。
                    需关注：沟通能力和团队协作能力有待在面试中进一步了解。
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>推荐操作</Label>
                  <div className="flex gap-2">
                    <Badge variant="default">安排面试</Badge>
                    <Badge variant="secondary">技能测试</Badge>
                    <Badge variant="outline">进入人才池</Badge>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAnalysisOpen(false)}>
              关闭
            </Button>
            {!isAnalyzing && (
              <Button onClick={() => {
                alert('面试邀请已发送')
                setIsAnalysisOpen(false)
              }}>
                发送面试邀请
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

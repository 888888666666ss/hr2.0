'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Brain, 
  MessageSquare, 
  Code, 
  Users, 
  Lightbulb,
  Copy,
  Check
} from 'lucide-react'

interface InterviewQuestionsProps {
  jobId: string
  positionTitle: string
}

export function InterviewQuestions({ jobId, positionTitle }: InterviewQuestionsProps) {
  const [level, setLevel] = useState('mid')
  const [skillsInput, setSkillsInput] = useState('')
  const [questions, setQuestions] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s)
      
      const response = await fetch('/api/ai/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          positionTitle,
          level,
          skills
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '生成失败')
      }

      setQuestions(data.questions)

    } catch (err: any) {
      setError(err.message || '生成面试问题时出现错误')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async (text: string, index: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const questionCategories = [
    {
      key: 'technical',
      title: '技术问题',
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: '评估候选人的技术能力和专业知识'
    },
    {
      key: 'behavioral',
      title: '行为面试',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: '了解候选人的工作方式和处事态度'
    },
    {
      key: 'situational',
      title: '情景面试',
      icon: Lightbulb,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: '测试候选人的问题解决能力'
    }
  ]

  return (
    <div className="space-y-6">
      {/* 问题生成配置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI 面试问题生成
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="level">职位级别</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">初级</SelectItem>
                  <SelectItem value="mid">中级</SelectItem>
                  <SelectItem value="senior">高级</SelectItem>
                  <SelectItem value="lead">团队负责人</SelectItem>
                  <SelectItem value="manager">管理岗</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="skills">技能要求</Label>
              <Input
                id="skills"
                placeholder="React, TypeScript, Node.js（用逗号分隔）"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              职位: {positionTitle}
            </span>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              {isGenerating ? '生成中...' : '生成面试问题'}
            </Button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800">
              <span className="text-sm">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 生成的问题 */}
      {questions && (
        <div className="grid gap-6">
          {questionCategories.map((category) => {
            const categoryQuestions = questions[category.key] || []
            const Icon = category.icon

            return (
              <Card key={category.key}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${category.color}`}>
                    <Icon className="h-5 w-5" />
                    {category.title}
                    <Badge variant="secondary" className="ml-auto">
                      {categoryQuestions.length} 个问题
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryQuestions.length > 0 ? (
                      categoryQuestions.map((question: string, index: number) => {
                        const questionId = `${category.key}-${index}`
                        return (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg border ${category.bgColor} group relative`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <span className="text-sm font-medium text-muted-foreground">
                                  Q{index + 1}.
                                </span>
                                <p className="text-sm mt-1">{question}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(question, questionId)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {copiedIndex === questionId ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        暂无 {category.title.toLowerCase()} 问题
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Brain, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb,
  Star,
  AlertCircle
} from 'lucide-react'

interface ResumeAnalysisProps {
  candidateId: string
  jobId: string
}

export function ResumeAnalysis({ candidateId, jobId }: ResumeAnalysisProps) {
  const [resumeText, setResumeText] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('请输入简历内容')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateId,
          jobId,
          resumeText
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '分析失败')
      }

      setAnalysis(data.analysis)

    } catch (err: any) {
      setError(err.message || '分析过程中出现错误')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* 简历输入区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            简历内容
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="resume">粘贴或输入简历内容</Label>
            <Textarea
              id="resume"
              placeholder="请粘贴候选人的简历内容..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[200px] mt-2"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              字数: {resumeText.length}
            </span>
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeText.trim()}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              {isAnalyzing ? 'AI 分析中...' : 'AI 智能分析'}
            </Button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 分析结果 */}
      {analysis && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* 匹配度评分 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                匹配度评分
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-4xl font-bold ${getScoreColor(analysis.matchScore)}`}>
                  {analysis.matchScore}分
                </div>
                <Progress value={analysis.matchScore} className="w-full" />
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(analysis.matchScore)}`}>
                  {analysis.matchScore >= 80 ? '高度匹配' :
                   analysis.matchScore >= 60 ? '中等匹配' : '低匹配度'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 技能标签 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                识别技能
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.skills?.length > 0 ? (
                  analysis.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">未识别到相关技能</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 优势 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                候选人优势
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.strengths?.length > 0 ? (
                  analysis.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))
                ) : (
                  <span className="text-muted-foreground">暂无明显优势</span>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* 关注点 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <TrendingDown className="h-5 w-5" />
                需要关注
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.concerns?.length > 0 ? (
                  analysis.concerns.map((concern: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span className="text-sm">{concern}</span>
                    </li>
                  ))
                ) : (
                  <span className="text-muted-foreground">暂无明显关注点</span>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* 推荐建议 */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI 推荐建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations?.length > 0 ? (
                  analysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">→</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))
                ) : (
                  <span className="text-muted-foreground">暂无推荐建议</span>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
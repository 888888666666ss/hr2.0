'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AIInterviewPage() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: '你好！我是 AI 面试助手。请简单介绍一下你的工作经历。',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const router = useRouter()

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        '很好！能详细说说你在 React 项目中的具体职责吗？',
        '请描述一个你遇到的技术难题，以及你是如何解决的？',
        '你对前端性能优化有哪些实践经验？',
        '面试已完成！正在生成评估报告...',
      ]
      const nextResponse =
        responses[Math.min(messages.length / 2, responses.length - 1)]

      setMessages((prev) => [...prev, { role: 'ai', content: nextResponse }])
      setIsTyping(false)

      if (messages.length >= 6) {
        setTimeout(() => {
          // Generate interview ID - in real app this would come from backend after creating the interview
          const interviewId = Date.now().toString()
          router.push(`/interviews/${interviewId}/report`)
        }, 2000)
      }
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="AI 初筛面试"
          description="候选人：张三 - 高级前端工程师"
        >
          <Badge variant="secondary">进行中</Badge>
        </PageHeader>

        <main className="flex-1 overflow-hidden p-6">
          <div className="mx-auto flex h-full max-w-4xl flex-col">
            <Card className="flex-1 overflow-hidden">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI 面试对话
                </CardTitle>
              </CardHeader>
              <CardContent className="flex h-full flex-col p-0">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="rounded-lg bg-secondary px-4 py-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-secondary-foreground" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-secondary-foreground delay-100" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-secondary-foreground delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="输入你的回答..."
                      className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button onClick={handleSend} disabled={!input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AIAssistant page="interviews" />
    </div>
  )
}

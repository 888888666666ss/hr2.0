'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, FileText, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UploadResumePage() {
  const [files, setFiles] = useState<string[]>([])
  const router = useRouter()

  const handleUpload = () => {
    // Simulate upload
    alert('简历上传成功！正在进行 AI 分析...')
    // Generate resume ID - in real app this would come from backend after creating the resume
    const resumeId = Date.now().toString()
    router.push(`/resumes/${resumeId}/analysis`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="上传简历" description="批量导入候选人简历" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle>上传文件</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-12 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    拖拽文件到此处，或点击上传
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    支持 PDF、Word、TXT 格式，单个文件不超过 10MB
                  </p>
                  <Button
                    onClick={() => {
                      setFiles([
                        '张三_前端工程师.pdf',
                        '李四_产品经理.pdf',
                      ])
                    }}
                  >
                    选择文件
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* File List */}
            {files.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>已选文件 ({files.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-sm text-foreground">{file}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFiles(files.filter((_, i) => i !== index))
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Options */}
            <Card>
              <CardHeader>
                <CardTitle>AI 处理选项</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    自动进行 AI 简历分析
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    自动匹配推荐岗位
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    发送 AI 初筛面试邀请
                  </span>
                </label>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => router.back()}>
                取消
              </Button>
              <Button onClick={handleUpload} disabled={files.length === 0}>
                上传并分析
              </Button>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="resumes" />
    </div>
  )
}

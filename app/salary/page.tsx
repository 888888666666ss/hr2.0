'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Eye, Upload, Shield, FileSpreadsheet } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SalaryAccessGuard } from '@/components/auth/salary-access-guard'
import { useAuth } from '@/lib/auth/auth-context'
import { canManageSalary } from '@/lib/auth/roles'

const salaryRecords = [
  {
    id: 1,
    ownerId: 'user123', // 添加 ownerId 用于权限判断
    month: '2024年1月',
    baseSalary: 20000,
    bonus: 5000,
    allowance: 1000,
    deductions: 2500,
    netSalary: 23500,
    status: 'paid',
  },
  {
    id: 2,
    ownerId: 'user123',
    month: '2023年12月',
    baseSalary: 20000,
    bonus: 3000,
    allowance: 1000,
    deductions: 2400,
    netSalary: 21600,
    status: 'paid',
  },
  {
    id: 3,
    ownerId: 'user123',
    month: '2023年11月',
    baseSalary: 20000,
    bonus: 2000,
    allowance: 1000,
    deductions: 2300,
    netSalary: 20700,
    status: 'paid',
  },
]

export default function SalaryPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleViewDetails = (recordId: number) => {
    router.push(`/salary/${recordId}`)
  }

  const handleDownloadSalarySlip = () => {
    // 模拟下载工资条
    const link = document.createElement('a')
    link.href = '/salary-slip-template.pdf' // 实际应该是动态生成的PDF链接
    link.download = '工资条-2024年1月.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportSalaryData = () => {
    setShowUploadDialog(true)
  }

  const handleDownloadTemplate = () => {
    // 模拟下载Excel模板
    const link = document.createElement('a')
    link.href = '/salary-import-template.xlsx' // 应该指向实际的模板文件
    link.download = '薪酬导入模板.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('请选择要上传的文件')
      return
    }

    // 模拟文件上传
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      // 这里应该调用实际的上传API
      // const response = await fetch('/api/salary/import', {
      //   method: 'POST',
      //   body: formData
      // })
      
      // 模拟上传成功
      alert(`文件 "${selectedFile.name}" 上传成功！\n已导入薪酬数据。`)
      setShowUploadDialog(false)
      setSelectedFile(null)
    } catch (error) {
      alert('上传失败，请重试')
    }
  }

  const handleDownloadRecord = (month: string, recordId: number) => {
    // 模拟下载特定月份的工资条
    const link = document.createElement('a')
    link.href = `/api/salary/${recordId}/download` // 实际的下载API
    link.download = `工资条-${month}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <SalaryAccessGuard>
      <div className="flex min-h-screen flex-col">
      <PageHeader
        title="薪酬管理"
        description="查看工资明细和历史记录"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Current Month Salary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>本月工资</CardTitle>
                <CardDescription>2024年1月</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(1)}>
                  <Eye className="mr-1.5 h-4 w-4" />
                  查看详情
                </Button>
                <Button size="sm" onClick={handleDownloadSalarySlip}>
                  <Download className="mr-1.5 h-4 w-4" />
                  下载工资条
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-5">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">基本工资</div>
                <div className="text-2xl font-bold">¥20,000</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">绩效奖金</div>
                <div className="text-2xl font-bold text-green-600">+¥5,000</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">各项补贴</div>
                <div className="text-2xl font-bold text-green-600">+¥1,000</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">五险一金</div>
                <div className="text-2xl font-bold text-red-600">-¥2,500</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">实发工资</div>
                <div className="text-3xl font-bold text-primary">¥23,500</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Records */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>历史工资记录</CardTitle>
              <div className="flex gap-2">
                {user && canManageSalary(user.role) && (
                  <>
                    <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      下载模板
                    </Button>
                    <Button variant="outline" onClick={handleImportSalaryData}>
                      <Upload className="mr-2 h-4 w-4" />
                      导入工资数据
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salaryRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-8 flex-1">
                    <div className="font-medium w-32">{record.month}</div>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">基本: </span>
                        <span className="font-medium">¥{record.baseSalary.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">奖金: </span>
                        <span className="font-medium text-green-600">¥{record.bonus.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">补贴: </span>
                        <span className="font-medium text-green-600">¥{record.allowance.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">扣款: </span>
                        <span className="font-medium text-red-600">¥{record.deductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">实发</div>
                      <div className="text-xl font-bold text-primary">
                        ¥{record.netSalary.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(record.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadRecord(record.month, record.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 文件上传对话框 */}
      {showUploadDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>导入工资数据</CardTitle>
              <CardDescription>
                请选择包含工资数据的Excel文件进行上传
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">选择文件</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    已选择: {selectedFile.name}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  取消
                </Button>
                <Button onClick={handleFileUpload} disabled={!selectedFile}>
                  上传
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      </div>
    </SalaryAccessGuard>
  )
}

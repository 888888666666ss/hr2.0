import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, context: RouteParams) {
  const params = await context.params
  try {
    const id = parseInt(params.id)
    const { action, comment } = await request.json()
    
    // 模拟审批操作
    console.log(`Approving job req ${id} with action: ${action}, comment: ${comment}`)
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟成功响应
    return NextResponse.json({ 
      success: true, 
      message: `Job requisition ${id} ${action} successfully`,
      action,
      comment
    })
  } catch (error) {
    console.error('Error processing approval:', error)
    return NextResponse.json(
      { error: 'Failed to process approval' },
      { status: 500 }
    )
  }
}
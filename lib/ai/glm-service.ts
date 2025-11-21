// AI 服务配置和接口
export interface AIConfig {
  apiKey: string
  apiUrl: string
  model: string
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIResponse {
  content: string
  usage?: {
    total_tokens: number
    prompt_tokens: number
    completion_tokens: number
  }
}

// 智谱 GLM AI 服务
export class GLMAIService {
  private config: AIConfig

  constructor() {
    this.config = {
      apiKey: process.env.GLM_API_KEY || '',
      apiUrl: process.env.GLM_API_URL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      model: 'glm-4-plus' // 或者使用其他模型
    }

    // 在开发/构建模式下，如果没有API key，只警告而不抛错
    if (!this.config.apiKey) {
      console.warn('⚠️ GLM API key not configured. AI features will use mock responses.')
    }
  }

  async chat(messages: AIMessage[]): Promise<AIResponse> {
    // 如果没有配置 API key，返回模拟响应
    if (!this.config.apiKey) {
      console.warn('🤖 Using mock AI response (API key not configured)')
      return {
        content: JSON.stringify({
          matchScore: 75,
          strengths: ['相关工作经验', '技能匹配'],
          concerns: ['需要进一步评估'],
          skills: ['JavaScript', 'React', 'Node.js'],
          recommendations: ['建议进入面试流程']
        }),
        usage: {
          total_tokens: 100,
          prompt_tokens: 80,
          completion_tokens: 20
        }
      }
    }

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: false
        })
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`GLM API error: ${response.status} - ${error}`)
      }

      const data = await response.json()
      
      return {
        content: data.choices[0]?.message?.content || '',
        usage: data.usage
      }
    } catch (error) {
      console.error('GLM AI Service Error:', error)
      throw error
    }
  }

  // 简历分析专用方法
  async analyzeResume(resumeText: string, jobDescription: string): Promise<{
    matchScore: number
    strengths: string[]
    concerns: string[]
    skills: string[]
    recommendations: string[]
  }> {
    const systemPrompt = `你是一个专业的HR招聘助手。请分析候选人简历与职位要求的匹配度。

请按照以下JSON格式返回分析结果：
{
  "matchScore": 85,
  "strengths": ["技能匹配度高", "工作经验丰富"],
  "concerns": ["缺少某些关键技能"],
  "skills": ["JavaScript", "React", "Node.js"],
  "recommendations": ["建议进入面试流程", "可以考虑技术面试"]
}

匹配分数范围：0-100分`

    const userPrompt = `职位描述：
${jobDescription}

候选人简历：
${resumeText}

请分析这份简历与职位的匹配度，并给出详细的评估报告。`

    const response = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ])

    try {
      // 尝试解析JSON响应
      const analysis = JSON.parse(response.content)
      return analysis
    } catch (error) {
      // 如果解析失败，返回默认结构
      console.error('Failed to parse AI response:', error)
      return {
        matchScore: 50,
        strengths: ['待评估'],
        concerns: ['AI分析解析失败'],
        skills: [],
        recommendations: ['建议人工审核']
      }
    }
  }

  // 生成面试问题
  async generateInterviewQuestions(
    position: string, 
    level: string, 
    skills: string[]
  ): Promise<{
    technical: string[]
    behavioral: string[]
    situational: string[]
  }> {
    const systemPrompt = `你是一个资深的HR面试官。请根据职位信息生成面试问题。

请按照以下JSON格式返回：
{
  "technical": ["技术相关问题1", "技术相关问题2"],
  "behavioral": ["行为面试问题1", "行为面试问题2"],
  "situational": ["情景面试问题1", "情景面试问题2"]
}

每个类别生成3-5个问题。`

    const userPrompt = `职位：${position}
级别：${level}
技能要求：${skills.join(', ')}

请生成适合这个职位的面试问题。`

    const response = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ])

    try {
      return JSON.parse(response.content)
    } catch (error) {
      console.error('Failed to parse interview questions:', error)
      return {
        technical: ['请介绍你的技术背景'],
        behavioral: ['请描述一次你解决复杂问题的经历'],
        situational: ['如果遇到技术难题，你会如何处理？']
      }
    }
  }

  // 面试评估
  async evaluateInterview(
    questions: string[],
    answers: string[],
    position: string
  ): Promise<{
    overallScore: number
    technicalScore: number
    communicationScore: number
    cultureScore: number
    feedback: string[]
    recommendation: 'hire' | 'no_hire' | 'maybe'
  }> {
    const systemPrompt = `你是一个专业的面试评估专家。请根据面试问答对候选人进行评估。

评分标准：
- 整体评分：0-100分
- 技术能力：0-100分  
- 沟通能力：0-100分
- 文化匹配：0-100分

推荐结果：hire（推荐录用）、no_hire（不推荐）、maybe（需要进一步评估）

请按照以下JSON格式返回：
{
  "overallScore": 85,
  "technicalScore": 90,
  "communicationScore": 80,
  "cultureScore": 85,
  "feedback": ["技术能力强", "沟通清晰"],
  "recommendation": "hire"
}`

    const qaText = questions.map((q, i) => `
问题：${q}
回答：${answers[i] || '未回答'}
`).join('\n')

    const userPrompt = `职位：${position}

面试问答：
${qaText}

请对这次面试进行评估。`

    const response = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ])

    try {
      return JSON.parse(response.content)
    } catch (error) {
      console.error('Failed to parse interview evaluation:', error)
      return {
        overallScore: 70,
        technicalScore: 70,
        communicationScore: 70,
        cultureScore: 70,
        feedback: ['评估解析失败，建议人工审核'],
        recommendation: 'maybe'
      }
    }
  }
}

// 导出AI服务实例
export const aiService = new GLMAIService()
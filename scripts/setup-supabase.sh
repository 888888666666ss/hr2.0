#!/bin/bash

# ===========================================
# Supabase Database Setup Script
# ===========================================

echo "🚀 开始设置 Supabase 数据库..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Supabase 项目信息
SUPABASE_URL="https://aybbevutgyxxelgddmf.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YmJldnV0Z3l4eGVsaWdkZG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjA4MzIsImV4cCI6MjA3ODM5NjgzMn0.2mndCIK3J582VkroXR7NiUR39zpBhfQW7g3V7z0PQDc"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YmJldnV0Z3l4eGVsaWdkZG1mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjgyMDgzMiwiZXhwIjoyMDc4Mzk2ODMyfQ.E1LvKCpjX3cfAQNehx-P84MGgCNcSsREvdAv-o86Djk"

# 函数：执行 SQL 脚本
execute_sql() {
    local sql_file=$1
    local description=$2
    
    echo -e "${BLUE}📄 $description${NC}"
    
    if [ ! -f "$sql_file" ]; then
        echo -e "${RED}❌ 文件不存在: $sql_file${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}🔄 正在执行: $sql_file${NC}"
    
    # 使用 curl 直接向 Supabase REST API 发送 SQL
    response=$(curl -s -X POST \
        "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -d "{\"sql\": $(jq -R -s . < "$sql_file")}" \
        2>/dev/null)
    
    if [ $? -eq 0 ] && [[ ! "$response" == *"error"* ]]; then
        echo -e "${GREEN}✅ 成功执行: $description${NC}"
        return 0
    else
        echo -e "${RED}❌ 执行失败: $description${NC}"
        echo -e "${RED}错误响应: $response${NC}"
        return 1
    fi
}

# 函数：直接执行 SQL 命令
execute_sql_direct() {
    local sql_content="$1"
    local description="$2"
    
    echo -e "${BLUE}📄 $description${NC}"
    echo -e "${YELLOW}🔄 正在执行 SQL...${NC}"
    
    # 使用 PostgREST 执行原始 SQL
    response=$(curl -s -X POST \
        "${SUPABASE_URL}/rest/v1/rpc/exec_raw_sql" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -d "{\"sql\": \"$sql_content\"}" \
        2>/dev/null)
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 成功执行: $description${NC}"
        return 0
    else
        echo -e "${RED}❌ 执行失败: $description${NC}"
        echo -e "${RED}错误响应: $response${NC}"
        return 1
    fi
}

# 主要设置流程
echo -e "${GREEN}🎯 Supabase 数据库设置开始...${NC}"

# 1. 检查必需的文件
echo -e "\n${BLUE}📋 检查必需文件...${NC}"

if [ ! -f "./database/supabase-schema.sql" ]; then
    echo -e "${RED}❌ 未找到数据库架构文件${NC}"
    exit 1
fi

if [ ! -f "./scripts/init-supabase.sql" ]; then
    echo -e "${RED}❌ 未找到初始化脚本${NC}"
    exit 1
fi

# 2. 执行主要的数据库架构
echo -e "\n${BLUE}🏗️  创建数据库架构...${NC}"
execute_sql "./database/supabase-schema.sql" "创建所有数据库表和索引"

# 3. 执行初始化数据
echo -e "\n${BLUE}📊 插入初始化数据...${NC}"
execute_sql "./scripts/init-supabase.sql" "插入基础数据和测试数据"

# 4. 创建测试用户 (通过 Supabase Auth API)
echo -e "\n${BLUE}👤 创建测试用户...${NC}"

# 测试用户数据
create_test_user() {
    local email=$1
    local password=$2
    local name=$3
    
    echo -e "${YELLOW}🔄 创建用户: $email${NC}"
    
    response=$(curl -s -X POST \
        "${SUPABASE_URL}/auth/v1/admin/users" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -d "{
            \"email\": \"$email\",
            \"password\": \"$password\",
            \"email_confirm\": true,
            \"user_metadata\": {
                \"full_name\": \"$name\"
            }
        }")
    
    if [[ "$response" == *"id"* ]]; then
        echo -e "${GREEN}✅ 用户创建成功: $email${NC}"
    else
        echo -e "${YELLOW}⚠️  用户可能已存在或创建失败: $email${NC}"
    fi
}

# 创建几个测试用户
create_test_user "admin@demo.com" "123456" "系统管理员"
create_test_user "hr@demo.com" "123456" "HR专员"
create_test_user "recruiter@demo.com" "123456" "招聘专员"

# 5. 验证设置
echo -e "\n${BLUE}✅ 验证数据库设置...${NC}"

# 检查表是否存在
check_table() {
    local table_name=$1
    
    response=$(curl -s \
        "${SUPABASE_URL}/rest/v1/${table_name}?select=count" \
        -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -H "Range: 0-0")
    
    if [ $? -eq 0 ] && [[ ! "$response" == *"error"* ]]; then
        echo -e "${GREEN}✅ 表存在: $table_name${NC}"
    else
        echo -e "${RED}❌ 表不存在或无法访问: $table_name${NC}"
    fi
}

echo -e "${YELLOW}🔍 检查主要表...${NC}"
check_table "companies"
check_table "users" 
check_table "jobs"
check_table "candidates"
check_table "departments"

# 6. 显示完成信息
echo -e "\n${GREEN}🎉 数据库设置完成！${NC}"
echo -e "\n${BLUE}📋 测试账号信息:${NC}"
echo -e "  👤 管理员: admin@demo.com / 123456"
echo -e "  👤 HR专员: hr@demo.com / 123456" 
echo -e "  👤 招聘专员: recruiter@demo.com / 123456"

echo -e "\n${BLUE}🔗 访问信息:${NC}"
echo -e "  🌐 应用地址: http://localhost:3002"
echo -e "  🗄️  数据库地址: $SUPABASE_URL"

echo -e "\n${YELLOW}📝 下一步:${NC}"
echo -e "  1. 打开浏览器访问 http://localhost:3002"
echo -e "  2. 使用测试账号登录"
echo -e "  3. 验证登录跳转功能"

echo -e "\n${GREEN}✨ 设置完成！${NC}"
# Product Config Answer Contract

## Goal
前后端统一按结构化结果处理产品配置问答，不再直接依赖大段自然语言文本进行渲染。

## Backend Output Contract
后端应返回一个结构化对象，字段如下：

```json
{
  "summary": "qa环境下，资源编码9300配置了以下处理场景及对应单据类型。",
  "productInfo": {
    "environment": "qa",
    "resourceCode": "9300",
    "productCode": "9888",
    "financeCode": "600087",
    "goldToadCode": "C5545"
  },
  "mappings": [
    {
      "sceneType": "2",
      "sceneName": "出票成功",
      "receiptType": "300",
      "receiptName": "普通结算单"
    },
    {
      "sceneType": "3",
      "sceneName": "产品过期",
      "receiptType": "300",
      "receiptName": "普通结算单"
    }
  ],
  "rawAnswer": "可选，保留模型原始自然语言回答"
}
```

## Field Rules
1. `summary`: 简短结论，用于顶部摘要展示。
2. `productInfo`: 产品主信息，不允许截断编码。
3. `mappings`: 场景和单据类型映射列表。
4. `rawAnswer`: 可选，仅用于调试或兜底展示，前端不要作为主展示内容。

## Required Behavior
1. 如果 `productInfo` 某字段为空，后端返回空字符串，不要返回截断值。
2. 如果 `mappings` 有多条，全部返回。
3. 如果没有命中结果，返回空数组 `mappings: []`。

## Frontend Rendering Rules
前端不要直接渲染整段 `rawAnswer` 作为主界面。

前端页面结构：
1. 摘要区：显示 `summary`
2. 产品信息区：展示 `productInfo`
3. 映射表格区：展示 `mappings`

## Frontend UI Mapping
产品信息区字段顺序：
1. 环境
2. 资源编码
3. 产品编码
4. 财务产品码
5. 金蟾产品码

映射表格列顺序：
1. 场景编码
2. 场景名称
3. 单据类型编码
4. 单据类型名称

## Empty State
如果 `mappings` 为空：
1. 显示“未查询到对应配置”
2. 保留查询条件展示
3. 不要展示残缺编码文本

## Copy For Frontend Session
让前端会话直接按本文件实现：

```text
请按 docs/product-config-answer-contract.md 实现前端展示。
不要直接展示 AI 原始回答文本。
主界面按 summary、productInfo、mappings 三段渲染。
productInfo 用信息卡片，mappings 用表格。
```

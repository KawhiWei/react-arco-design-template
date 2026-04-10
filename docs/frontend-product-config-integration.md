# Frontend Product Config Streaming Integration

## Purpose
产品配置问答使用流式 SSE 接口返回。

后端接口：

```text
POST /api/Chat/ChatStructured
```

这个接口是流式 SSE，不是普通 JSON 响应。

前端不要直接渲染 AI 原始自然语言文本。
请优先根据 `meta` 事件中的结构化字段渲染页面，再用 `text` 事件做流式文本补充。

## Transport Protocol
响应类型：

```text
Content-Type: text/event-stream
```

SSE 事件类型固定为：
1. `meta`
2. `text`
3. `done`
4. `error`

## Request

### Request Body

```json
{
  "message": "请查询qa环境下，资源编码9300这个产品配置了哪些处理场景，每个场景对应什么单据类型？请同时返回资源编码、产品编码、财务产品码和金蟾产品码。",
  "userId": "u1",
  "sessionId": "s1"
}
```

### Field Description
1. `message`: 用户问题
2. `userId`: 当前用户唯一标识
3. `sessionId`: 当前会话唯一标识

## SSE Event Protocol

### 1. meta
第一条关键事件，返回结构化数据。

```text
event: meta
data: { ...json... }
```

#### meta.data schema

```json
{
  "summary": "qa环境下，资源编码9300配置了以下处理场景及对应单据类型。",
  "displayText": "qa环境下，资源编码9300配置了以下处理场景及对应单据类型。\n\n产品配置信息：\n- 环境：qa\n- 资源编码：9300\n- 产品编码：9888\n- 财务产品码：600087\n- 金蟾产品码：C5545\n\n处理场景及对应单据类型：\n- 支付成功 -> 单据类型：销售单产品明细\n  场景编码：1；单据类型编码：100",
  "productInfo": {
    "environment": "qa",
    "resourceCode": "9300",
    "productCode": "9888",
    "financeCode": "600087",
    "goldToadCode": "C5545"
  },
  "mappings": [
    {
      "sceneType": "1",
      "sceneName": "支付成功",
      "receiptType": "100",
      "receiptName": "销售单产品明细"
    },
    {
      "sceneType": "2",
      "sceneName": "出票成功",
      "receiptType": "300",
      "receiptName": "普通结算单"
    }
  ],
  "rawAnswer": ""
}
```

### 2. text
模型流式文本增量。

```text
event: text
data: "增量文本"
```

前端收到后应追加到一个 `rawAnswerBuffer` 中。

### 3. done
流式结束事件。

```text
event: done
data: { "rawAnswer": "完整原始回答" }
```

### 4. error
错误事件。

```text
event: error
data: { "message": "OpenAI call failed." }
```

## Frontend Rendering Priority

推荐优先级：
1. `meta.summary`
2. `meta.productInfo`
3. `meta.mappings`
4. `meta.displayText`
5. `text/done` 仅作为流式文本展示或调试

不要把 `text` 事件拼出来的自然语言作为唯一主展示内容。

## Recommended Rendering

### Main UI
主界面按 `meta` 事件渲染：
1. 摘要区：显示 `summary`
2. 产品信息卡片：显示 `productInfo`
3. 映射表格：显示 `mappings`

注意：`meta` 区域和 `text` 区域必须分开渲染，不要拼接成一个字符串。

错误示例：

```ts
display = meta.summary + textBuffer
```

正确示例：
1. `meta.summary` 单独显示在摘要区
2. `meta.productInfo` 单独显示在信息卡片区
3. `meta.mappings` 单独显示在表格区
4. `text` 事件累计内容单独显示在“AI回答流”区域

### Streaming Text Area
如果页面需要打字机效果：
1. 监听 `text` 事件
2. 逐步追加显示
3. 放在“AI解释”或“原始回答”区域

### Empty Meta Handling
如果 `meta.summary` 为空字符串：
1. 不显示摘要区
2. 不要兜底展示“未查询到对应配置”

如果 `meta.displayText` 为空字符串：
1. 不显示兜底文本区
2. 继续等待 `text` 或 `done` 事件

### Quick Fallback
如果前端暂时不做卡片和表格：
1. 先展示 `meta.displayText`
2. 样式使用 `white-space: pre-wrap`

但只有在 `meta.displayText` 非空时才展示。

## UI Rules

### Product Info Card Order
1. 环境
2. 资源编码
3. 产品编码
4. 财务产品码
5. 金蟾产品码

### Mapping Table Columns
1. 场景编码
2. 场景名称
3. 单据类型编码
4. 单据类型名称

## Empty State

当 `meta.mappings.length === 0` 时：
1. 显示“未查询到对应配置”
2. 可保留用户原始查询条件
3. 不要展示残缺编码信息

## TypeScript Definitions

```ts
export interface ProductConfigAnswerDto {
  summary: string
  displayText: string
  productInfo: ProductConfigProductInfoDto
  mappings: ProductConfigMappingDto[]
  rawAnswer: string
}

export interface ProductConfigProductInfoDto {
  environment: string
  resourceCode: string
  productCode: string
  financeCode: string
  goldToadCode: string
}

export interface ProductConfigMappingDto {
  sceneType: string
  sceneName: string
  receiptType: string
  receiptName: string
}

export type StructuredChatEvent =
  | { event: 'meta'; data: ProductConfigAnswerDto }
  | { event: 'text'; data: string }
  | { event: 'done'; data: { rawAnswer: string } }
  | { event: 'error'; data: { message: string } }
```

## Frontend Example Logic

前端处理逻辑建议：

1. 建立 SSE 连接
2. 收到 `meta`：更新页面主数据
3. 收到 `text`：追加到流式文本区
4. 收到 `done`：结束 loading，记录完整原始文本
5. 收到 `error`：展示错误提示

## Frontend Do And Don't

### Do
1. 用 `meta.summary` 做摘要
2. 用 `meta.productInfo` 做信息卡片
3. 用 `meta.mappings` 做表格
4. 用 `meta.displayText` 做临时兜底展示
5. 用 `text` 做流式打字机区域
6. 当 `meta.summary` 或 `meta.displayText` 为空时，直接跳过对应区域

### Don't
1. 不要只展示 `text` 拼接后的自然语言
2. 不要从 `text` 或 `done.rawAnswer` 中正则提取字段
3. 不要依赖模型自然语言换行和标点做主页面布局
4. 不要把 `meta` 和 `text` 拼接到一个字符串中展示

## Copy For Frontend Session

把下面这段直接发给前端会话即可：

```text
请按 docs/frontend-product-config-integration.md 对接后端流式 SSE 接口。
接口使用 POST /api/Chat/ChatStructured。
这是 SSE 流式接口，事件类型固定为 meta、text、done、error。
主界面按 meta.summary + meta.productInfo + meta.mappings 渲染。
如果暂时不做结构化组件，就先展示 meta.displayText。
text 事件只用于流式文本展示，不要作为主数据来源。
不要直接展示 done.rawAnswer，也不要从 rawAnswer 里提取字段。
```
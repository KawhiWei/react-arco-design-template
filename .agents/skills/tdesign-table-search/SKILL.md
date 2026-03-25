---
name: tdesign-table-search
description: Build a TDesign starter/base style page with search bar, query/reset actions, table list, and pagination.
compatibility: Generic project-level .agents skill format
---

Use this skill when user asks for a page with:
- Search/filter bar
- Query and reset actions
- Data table list
- Optional pagination

Deliverable requirement (must include all):
- A complete runnable page component (`index.tsx`)
- Stable typed mock data and columns
- Filter state + query/reset handlers
- Pagination state with page-size switching events
- Table internal scrolling when rows exceed height (page should not scroll)

Implementation workflow:

1. Build structure
- Top search section with `Form` + `Input/Select`
- Action buttons (`Button theme="primary"` for query, base/outline for reset)
- Table section below (`Table` with stable `rowKey`)
- Optional `Pagination` at bottom-right

2. Baseline code contract
- Keep state:
  - `current`, `pageSize`, `total`
  - filter fields (`keyword`, etc.)
- Implement handlers:
  - `onCurrentChange(current)`
  - `onPageSizeChange(size)` and reset `current` to 1
- Recompute current page data with `useMemo`
- Use table scroll props so row overflow scrolls inside table, not whole page:
  - `maxHeight` (or `height`) and/or `scroll={{ type: 'virtual', ... }}` if needed in project

Example pagination wiring:

```tsx
<Pagination
  total={filtered.length}
  current={current}
  pageSize={pageSize}
  pageSizeOptions={[10, 20, 50]}
  showPageSize
  showJumper
  onCurrentChange={(next) => setCurrent(next)}
  onPageSizeChange={(size) => {
    setPageSize(Number(size));
    setCurrent(1);
  }}
/>
```

Example table internal scroll:

```tsx
const tableMaxHeight = useMemo(() => Math.max(window.innerHeight - 200, 260), []);

<Table
  rowKey="id"
  columns={columns}
  data={pagedData}
  maxHeight={tableMaxHeight}
/>
```

Default rule:
- `Table maxHeight` should be `window.innerHeight - 200`
- Keep a small lower bound (e.g. `260`) to avoid too-small table areas on tiny windows

3. Keep behavior clear
- Controlled filter state in React
- Query applies filters to data source
- Reset restores defaults and resets page index

4. Follow visual conventions
- Compact spacing similar to TDesign starter/base
- Avoid heavy custom CSS
- Use subtle container/card backgrounds and clear section spacing
- Prefer table-area scrollbar; avoid page-level scroll for long list sections

5. Verification
- Ensure file-level lint clean when possible
- `npm run build` must pass

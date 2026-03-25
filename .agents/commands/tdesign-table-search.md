---
description: Scaffold or refactor a page to TDesign starter/base style search + table layout
---

Create or update a page with:
- Search bar (`Form`, `Input`, optional `Select`)
- Query + Reset actions
- Data `Table`
- Optional `Pagination`

Must-generate code scope:
- Full page component (not partial snippets)
- Typed mock data + columns
- Query/reset logic
- Pagination current/pageSize state
- `onCurrentChange` + `onPageSizeChange` implementation
- Table internal scrolling (row overflow in table, not whole page)

Checklist:
1. Locate target page and route/menu integration.
2. Build filter section and controlled state.
3. Wire query/reset behavior to table data.
4. Add pagination with page size switching support:
   - `showPageSize`
   - `onCurrentChange`
   - `onPageSizeChange` (reset page to 1)
5. Ensure table-only scrollbar for long rows:
   - use `maxHeight` on `Table` and avoid page-level overflow
   - default maxHeight formula: `window.innerHeight - 200` (with a lower bound)
6. Keep UI compact and consistent with TDesign starter/base style.
7. Validate with:
   - `npx eslint <target-file>`
   - `npm run build`

Reference implementation fragment:

```tsx
const [current, setCurrent] = useState(1);
const [pageSize, setPageSize] = useState(10);

const pagedData = useMemo(() => {
  const start = (current - 1) * pageSize;
  return filtered.slice(start, start + pageSize);
}, [filtered, current, pageSize]);

const tableMaxHeight = useMemo(() => Math.max(window.innerHeight - 200, 260), []);

<Table rowKey="id" columns={columns} data={pagedData} maxHeight={tableMaxHeight} />

<Pagination
  total={filtered.length}
  current={current}
  pageSize={pageSize}
  pageSizeOptions={[10, 20, 50]}
  showPageSize
  onCurrentChange={(next) => setCurrent(next)}
  onPageSizeChange={(size) => {
    setPageSize(Number(size));
    setCurrent(1);
  }}
/>
```

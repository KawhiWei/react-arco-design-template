import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Form, Input, Pagination, Select, Space, Table, type TableProps } from 'tdesign-react';

type ProductStatus = '启用' | '停用';
type ProductType = '标准产品' | '增值产品' | '渠道产品';

type ProductConfigItem = {
  id: string;
  productCode: string;
  productName: string;
  productType: ProductType;
  status: ProductStatus;
  version: string;
  updatedAt: string;
};

type FilterState = {
  keyword: string;
  productType: '' | ProductType;
  status: '' | ProductStatus;
};

const defaultFilters: FilterState = {
  keyword: '',
  productType: '',
  status: '',
};

const sourceData: ProductConfigItem[] = Array.from({ length: 72 }).map((_, index) => {
  const seq = index + 1;
  const productTypes: ProductType[] = ['标准产品', '增值产品', '渠道产品'];
  return {
    id: `PC-${String(seq).padStart(4, '0')}`,
    productCode: `PROD_${String((index % 20) + 1).padStart(3, '0')}`,
    productName: `产品配置 ${seq}`,
    productType: productTypes[index % productTypes.length],
    status: index % 4 === 0 ? '停用' : '启用',
    version: `v${Math.floor(index / 12) + 1}.${(index % 6) + 1}.0`,
    updatedAt: `2026-03-${String((index % 28) + 1).padStart(2, '0')} 14:30`,
  };
});

const productTypeOptions = [
  { label: '全部类型', value: '' },
  { label: '标准产品', value: '标准产品' },
  { label: '增值产品', value: '增值产品' },
  { label: '渠道产品', value: '渠道产品' },
];

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '启用', value: '启用' },
  { label: '停用', value: '停用' },
];

const columns: TableProps<ProductConfigItem>['columns'] = [
  { colKey: 'id', title: '配置ID', width: 130 },
  { colKey: 'productCode', title: '产品编码', width: 140 },
  { colKey: 'productName', title: '产品名称', minWidth: 220, ellipsis: true },
  { colKey: 'productType', title: '产品类型', width: 120 },
  { colKey: 'version', title: '版本', width: 100 },
  { colKey: 'status', title: '状态', width: 100 },
  { colKey: 'updatedAt', title: '更新时间', width: 180 },
  {
    colKey: 'operation',
    title: '操作',
    width: 160,
    fixed: 'right',
    cell: () => (
      <Space size="small">
        <Button variant="text" theme="primary" size="small">
          编辑
        </Button>
        <Button variant="text" theme="primary" size="small">
          详情
        </Button>
      </Space>
    ),
  },
];

const ProductConfigPage = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableMaxHeight, setTableMaxHeight] = useState(() => Math.max(window.innerHeight - 200, 260));
  const tableWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateTableMaxHeight = () => {
      const baseHeight = Math.max(window.innerHeight - 200, 260);
      if (!tableWrapRef.current) {
        setTableMaxHeight(baseHeight);
        return;
      }
      const top = tableWrapRef.current.getBoundingClientRect().top;
      const next = Math.max(Math.floor(window.innerHeight - top - 110), 260);
      setTableMaxHeight(next);
    };

    updateTableMaxHeight();
    const frame = window.requestAnimationFrame(updateTableMaxHeight);
    window.addEventListener('resize', updateTableMaxHeight);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateTableMaxHeight);
    };
  }, []);

  const filteredData = useMemo(() => {
    const keyword = appliedFilters.keyword.trim().toLowerCase();
    return sourceData.filter((item) => {
      const matchesKeyword =
        !keyword ||
        item.id.toLowerCase().includes(keyword) ||
        item.productCode.toLowerCase().includes(keyword) ||
        item.productName.toLowerCase().includes(keyword);
      const matchesType = !appliedFilters.productType || item.productType === appliedFilters.productType;
      const matchesStatus = !appliedFilters.status || item.status === appliedFilters.status;
      return matchesKeyword && matchesType && matchesStatus;
    });
  }, [appliedFilters]);

  const total = filteredData.length;

  const pagedData = useMemo(() => {
    const start = (current - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [current, filteredData, pageSize]);

  const handleQuery = () => {
    setAppliedFilters(filters);
    setCurrent(1);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setCurrent(1);
  };

  return (
    <div>
      <Card bordered>
        <Form layout="inline">
          <Form.FormItem label="关键词">
            <Input
              value={filters.keyword}
              clearable
              placeholder="请输入配置ID/产品编码/产品名称"
              style={{ width: 260 }}
              onChange={(value) => setFilters((prev) => ({ ...prev, keyword: value }))}
            />
          </Form.FormItem>

          <Form.FormItem label="产品类型">
            <Select
              value={filters.productType}
              style={{ width: 160 }}
              options={productTypeOptions}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  productType:
                    value === '标准产品' || value === '增值产品' || value === '渠道产品' ? value : '',
                }))
              }
            />
          </Form.FormItem>

          <Form.FormItem label="状态">
            <Select
              value={filters.status}
              style={{ width: 140 }}
              options={statusOptions}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  status: value === '启用' || value === '停用' ? value : '',
                }))
              }
            />
          </Form.FormItem>

          <Form.FormItem>
            <Space>
              <Button theme="primary" onClick={handleQuery}>
                查询
              </Button>
              <Button variant="base" onClick={handleReset}>
                重置
              </Button>
            </Space>
          </Form.FormItem>
        </Form>
      </Card>

      <Card bordered style={{ marginTop: 16 }}>
        <div ref={tableWrapRef}>
          <Table
            rowKey="id"
            columns={columns}
            data={pagedData}
            verticalAlign="middle"
            maxHeight={tableMaxHeight}
            tableLayout="fixed"
          />
        </div>

        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            total={total}
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
        </div>
      </Card>
    </div>
  );
};

export default ProductConfigPage;

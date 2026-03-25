import { Button, Card, Form, Input, Pagination, Select, Space, Table } from 'tdesign-react';
import { useEffect, useMemo, useState } from 'react';

type RuleItem = {
  id: string;
  ruleName: string;
  status: '启用' | '停用';
  channel: '线上' | '线下';
  updatedAt: string;
};

const sourceData: RuleItem[] = Array.from({ length: 42 }).map((_, index) => ({
  id: `R-${String(index + 1).padStart(3, '0')}`,
  ruleName: `销售单校验规则 ${index + 1}`,
  status: index % 3 === 0 ? '停用' : '启用',
  channel: index % 2 === 0 ? '线上' : '线下',
  updatedAt: `2026-03-${String((index % 28) + 1).padStart(2, '0')} 10:30`,
}));

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '启用', value: '启用' },
  { label: '停用', value: '停用' },
];

const channelOptions = [
  { label: '全部渠道', value: '' },
  { label: '线上', value: '线上' },
  { label: '线下', value: '线下' },
];

const SalesRulePage = () => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [channel, setChannel] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableMaxHeight, setTableMaxHeight] = useState(() => Math.max(window.innerHeight - 200, 260));

  useEffect(() => {
    const handleResize = () => {
      setTableMaxHeight(Math.max(window.innerHeight - 200, 260));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filtered = useMemo(() => {
    const keywordValue = keyword.trim().toLowerCase();
    return sourceData.filter((item) => {
      const matchesKeyword =
        keywordValue.length === 0 ||
        item.ruleName.toLowerCase().includes(keywordValue) ||
        item.id.toLowerCase().includes(keywordValue);
      const matchesStatus = !status || item.status === status;
      const matchesChannel = !channel || item.channel === channel;
      return matchesKeyword && matchesStatus && matchesChannel;
    });
  }, [channel, keyword, status]);

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const columns = [
    { colKey: 'id', title: '规则ID', width: 120 },
    { colKey: 'ruleName', title: '规则名称', ellipsis: true },
    { colKey: 'status', title: '状态', width: 100 },
    { colKey: 'channel', title: '渠道', width: 100 },
    { colKey: 'updatedAt', title: '更新时间', width: 180 },
    {
      colKey: 'op',
      title: '操作',
      width: 170,
      cell: () => (
        <Space size="small">
          <Button variant="text" theme="primary" size="small">
            编辑
          </Button>
          <Button variant="text" theme="danger" size="small">
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleQuery = () => {
    setPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setStatus('');
    setChannel('');
    setPage(1);
  };

  return (
    <div>
      <Card bordered>
        <Form layout="inline">
          <Form.FormItem label="关键词">
            <Input
              value={keyword}
              clearable
              placeholder="请输入规则名称或ID"
              style={{ width: 220 }}
              onChange={(value) => setKeyword(value)}
            />
          </Form.FormItem>
          <Form.FormItem label="状态">
            <Select
              value={status}
              style={{ width: 140 }}
              options={statusOptions}
              onChange={(value) => setStatus(String(value ?? ''))}
            />
          </Form.FormItem>
          <Form.FormItem label="渠道">
            <Select
              value={channel}
              style={{ width: 140 }}
              options={channelOptions}
              onChange={(value) => setChannel(String(value ?? ''))}
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
        <Table
          rowKey="id"
          columns={columns}
          data={pagedData}
          verticalAlign="middle"
          maxHeight={700}
          tableLayout="fixed"
        />
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            total={filtered.length}
            pageSize={pageSize}
            current={page}
            pageSizeOptions={[10, 20, 50]}
            showPageSize
            showJumper
            onCurrentChange={(current) => setPage(current)}
            onPageSizeChange={(size) => {
              setPageSize(Number(size));
              setPage(1);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default SalesRulePage;

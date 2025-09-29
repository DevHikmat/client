import { Table, type TableProps } from "antd";

interface CustomTableProps<T> extends TableProps<T> {
  columns: TableProps<T>["columns"];
  dataSource: T[] | undefined;
  rowKey: string;
}

const CustomTable = <T extends object>({
  columns,
  dataSource,
  rowKey,
  pagination,
  scroll,
  ...rest
}: CustomTableProps<T>) => {
  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        ...pagination,
      }}
      scroll={{ x: 1000, ...scroll }}
      {...rest}
    />
  );
};

export default CustomTable;

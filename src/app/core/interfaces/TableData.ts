export type TableData = Record<string, any>;

export function convertToTableData(data: any[]): TableData[] {
  return data.map((item) => {
    const tableData: TableData = {};
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        tableData[key] = item[key];
      }
    }
    return tableData;
  });
}

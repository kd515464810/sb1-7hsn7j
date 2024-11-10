import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { ColumnInfo } from '../../types';

interface StatisticsModuleProps {
  columns: ColumnInfo[];
  onProcess: (params: {
    groupByColumn: string;
    dataColumns: string[];
    operation: string;
  }) => void;
}

export function StatisticsModule({ columns, onProcess }: StatisticsModuleProps) {
  const [groupByColumn, setGroupByColumn] = useState('');
  const [dataColumns, setDataColumns] = useState<string[]>([]);
  const [operation, setOperation] = useState('sum');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcess({ groupByColumn, dataColumns, operation });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-medium text-gray-800">表格统计</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            分组列
          </label>
          <select
            value={groupByColumn}
            onChange={(e) => setGroupByColumn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">选择分组列...</option>
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            数据列（可多选）
          </label>
          <select
            multiple
            value={dataColumns}
            onChange={(e) =>
              setDataColumns(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            size={5}
          >
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.title}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">按住 Ctrl/Command 键可多选</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            统计方式
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="sum">求和</option>
            <option value="average">平均值</option>
            <option value="count">计数</option>
            <option value="max">最大值</option>
            <option value="min">最小值</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          统计并导出
        </button>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { GitMerge } from 'lucide-react';
import { ColumnInfo } from '../../types';

interface MergeModuleProps {
  columns: ColumnInfo[];
  onProcess: (params: { file1Column: string; file2Column: string }) => void;
}

export function MergeModule({ columns, onProcess }: MergeModuleProps) {
  const [file1Column, setFile1Column] = useState('');
  const [file2Column, setFile2Column] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcess({ file1Column, file2Column });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <GitMerge className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-medium text-gray-800">表格合并</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              第一个表格合并列
            </label>
            <select
              value={file1Column}
              onChange={(e) => setFile1Column(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">选择列...</option>
              {columns.map((col) => (
                <option key={col.key} value={col.key}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              第二个表格合并列
            </label>
            <select
              value={file2Column}
              onChange={(e) => setFile2Column(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">选择列...</option>
              {columns.map((col) => (
                <option key={col.key} value={col.key}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-blue-700">
            请确保两个表格中用于合并的列数据类型相同，且包含匹配的值
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          合并并导出
        </button>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { Files } from 'lucide-react';

interface MultiMergeModuleProps {
  onProcess: (params: { skipRows: number }) => void;
}

export function MultiMergeModule({ onProcess }: MultiMergeModuleProps) {
  const [skipRows, setSkipRows] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcess({ skipRows });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Files className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-medium text-gray-800">多表格行合并</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            跳过前几行
          </label>
          <input
            type="number"
            min="0"
            value={skipRows}
            onChange={(e) => setSkipRows(parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            设置需要跳过的表头行数，默认为0
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-md space-y-2">
          <p className="text-sm text-blue-700">
            注意事项：
          </p>
          <ul className="text-sm text-blue-700 list-disc list-inside">
            <li>确保所有表格具有相同的列结构</li>
            <li>数据将按照文件顺序合并</li>
            <li>合并后的表格将包含所有表格的数据行</li>
          </ul>
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
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { ColumnInfo } from '../../types';

interface CalculateModuleProps {
  columns: ColumnInfo[];
  onProcess: (params: { formula: string; targetColumn: string }) => void;
}

export function CalculateModule({ columns, onProcess }: CalculateModuleProps) {
  const [formula, setFormula] = useState('');
  const [targetColumn, setTargetColumn] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcess({ formula, targetColumn });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-medium text-gray-800">表格计算</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            可用列
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md">
            {columns.map((col) => (
              <span
                key={col.key}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
              >
                {col.title}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            计算公式
          </label>
          <input
            type="text"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            placeholder="例如: A + B * 2"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            使用列名作为变量，支持基本数学运算 (+, -, *, /)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            新列名称
          </label>
          <input
            type="text"
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            placeholder="输入新列的名称"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          计算并导出
        </button>
      </form>
    </div>
  );
}
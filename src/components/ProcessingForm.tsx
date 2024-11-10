import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { ColumnInfo, ProcessingConfig } from '../types';

interface ProcessingFormProps {
  files: File[];
  columns: ColumnInfo[];
  onProcess: (config: ProcessingConfig) => void;
}

export function ProcessingForm({ files, columns, onProcess }: ProcessingFormProps) {
  const [processingType, setProcessingType] = useState<ProcessingConfig['type']>('calculate');
  const [formula, setFormula] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [groupByColumn, setGroupByColumn] = useState('');
  const [dataColumns, setDataColumns] = useState<string[]>([]);
  const [operation, setOperation] = useState<'sum' | 'average' | 'count' | 'max' | 'min'>('sum');
  const [file1Column, setFile1Column] = useState('');
  const [file2Column, setFile2Column] = useState('');
  const [skipRows, setSkipRows] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const config: ProcessingConfig = {
      type: processingType,
      params: getParams(),
    };
    
    onProcess(config);
  };

  const getParams = () => {
    switch (processingType) {
      case 'calculate':
        return { formula, targetColumn };
      case 'statistics':
        return { groupByColumn, dataColumns, operation };
      case 'merge':
        return { file1Column, file2Column };
      case 'multiMerge':
        return { skipRows };
      default:
        return {};
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-700">处理选项</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            处理类型
          </label>
          <select
            value={processingType}
            onChange={(e) => setProcessingType(e.target.value as ProcessingConfig['type'])}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="calculate">表格计算</option>
            <option value="statistics">表格统计</option>
            <option value="merge">表格合并</option>
            <option value="multiMerge">多表格行合并</option>
          </select>
        </div>

        {processingType === 'calculate' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                计算公式
              </label>
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="例如: A + B * 2"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                结果列名
              </label>
              <input
                type="text"
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
                placeholder="新列名称"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}

        {processingType === 'statistics' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分组列
              </label>
              <select
                value={groupByColumn}
                onChange={(e) => setGroupByColumn(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
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
                统计列
              </label>
              <select
                multiple
                value={dataColumns}
                onChange={(e) => setDataColumns(Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {columns.map((col) => (
                  <option key={col.key} value={col.key}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                统计操作
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="sum">求和</option>
                <option value="average">平均值</option>
                <option value="count">计数</option>
                <option value="max">最大值</option>
                <option value="min">最小值</option>
              </select>
            </div>
          </>
        )}

        {processingType === 'merge' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                第一个表格合并列
              </label>
              <select
                value={file1Column}
                onChange={(e) => setFile1Column(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
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
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">选择列...</option>
                {columns.map((col) => (
                  <option key={col.key} value={col.key}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {processingType === 'multiMerge' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              跳过前几行
            </label>
            <input
              type="number"
              min="0"
              value={skipRows}
              onChange={(e) => setSkipRows(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          开始处理
        </button>
      </div>
    </form>
  );
}
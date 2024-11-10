import React from 'react';
import { BookOpen, Download } from 'lucide-react';

export function StandardModule() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-medium text-gray-800">碳计量标准</h3>
      </div>

      <div className="space-y-6">
        <div className="prose max-w-none">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">标准概述</h4>
            <p className="text-gray-600">
              这里将展示碳计量标准的具体内容。包括测量方法、计算公式等重要信息。
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <h5 className="font-medium text-gray-800">主要内容：</h5>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>测量方法和技术要求</li>
              <li>计算公式和参数说明</li>
              <li>数据质量控制要求</li>
              <li>结果报告规范</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            <Download className="w-5 h-5" />
            <span>下载完整标准文档</span>
          </button>
        </div>
      </div>
    </div>
  );
}
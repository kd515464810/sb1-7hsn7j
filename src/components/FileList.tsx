import React from 'react';
import { File, X } from 'lucide-react';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mt-6">
      <h3 className="text-lg font-medium text-gray-700 mb-3">已选择的文件</h3>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <File className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">{file.name}</span>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
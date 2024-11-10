import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: FileList) => void;
}

export function FileUploader({ onFilesSelected }: FileUploaderProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div
      className="w-full max-w-2xl p-8 border-2 border-dashed border-gray-300 rounded-lg 
                 hover:border-blue-500 transition-colors cursor-pointer bg-white/50 backdrop-blur-sm"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input
        id="fileInput"
        type="file"
        multiple
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={(e) => e.target.files && onFilesSelected(e.target.files)}
      />
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-blue-500" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            拖拽文件到这里，或点击上传
          </p>
          <p className="text-sm text-gray-500 mt-1">
            支持 CSV, Excel (.xlsx, .xls) 文件
          </p>
        </div>
      </div>
    </div>
  );
}
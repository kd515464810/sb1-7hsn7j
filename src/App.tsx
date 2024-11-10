import React, { useState, useEffect } from 'react';
import { FileUploader } from './components/FileUploader';
import { FileList } from './components/FileList';
import { TabNavigation } from './components/TabNavigation';
import { CalculateModule } from './components/modules/CalculateModule';
import { StatisticsModule } from './components/modules/StatisticsModule';
import { MergeModule } from './components/modules/MergeModule';
import { MultiMergeModule } from './components/modules/MultiMergeModule';
import { StandardModule } from './components/modules/StandardModule';
import { FileText } from 'lucide-react';
import { ProcessingConfig, ColumnInfo } from './types';
import { processFiles, readFile, getColumns, downloadProcessedFile } from './utils/fileProcessor';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [activeTab, setActiveTab] = useState<string>('calculate');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const loadColumns = async () => {
      if (files.length > 0) {
        try {
          const data = await readFile(files[0]);
          setColumns(getColumns(data));
        } catch (error) {
          console.error('读取列信息失败:', error);
        }
      }
    };

    loadColumns();
  }, [files]);

  const handleFilesSelected = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter(
      file => !files.some(f => f.name === file.name)
    );
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleProcess = async (type: string, params: any) => {
    setProcessing(true);
    try {
      const config: ProcessingConfig = { type: type as any, params };
      const result = await processFiles(files, config);
      if (result.success && result.data) {
        downloadProcessedFile(result.data, files[0].name);
      } else {
        alert(result.error || '处理失败');
      }
    } catch (error) {
      console.error('处理文件时出错:', error);
      alert('处理文件时出错，请重试');
    }
    setProcessing(false);
  };

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'calculate':
        return (
          <CalculateModule
            columns={columns}
            onProcess={(params) => handleProcess('calculate', params)}
          />
        );
      case 'statistics':
        return (
          <StatisticsModule
            columns={columns}
            onProcess={(params) => handleProcess('statistics', params)}
          />
        );
      case 'merge':
        return (
          <MergeModule
            columns={columns}
            onProcess={(params) => handleProcess('merge', params)}
          />
        );
      case 'multiMerge':
        return (
          <MultiMergeModule
            onProcess={(params) => handleProcess('multiMerge', params)}
          />
        );
      case 'standard':
        return <StandardModule />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              样地生物量计算APP
            </h1>
            <p className="text-gray-600">
              支持表格计算、统计分析、表格合并等多种功能，内置碳计量标准查询
            </p>
          </div>

          <div className="space-y-6">
            {activeTab !== 'standard' && (
              <>
                <FileUploader onFilesSelected={handleFilesSelected} />
                <FileList files={files} onRemove={handleRemoveFile} />
              </>
            )}
            
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            {renderActiveModule()}
          </div>

          {processing && (
            <div className="mt-8 text-center text-gray-600">
              正在处理文件，请稍候...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
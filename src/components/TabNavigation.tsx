import React from 'react';
import { Calculator, BarChart2, GitMerge, Files, BookOpen } from 'lucide-react';

interface Tab {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: Tab[] = [
    { id: 'calculate', icon: <Calculator className="w-5 h-5" />, label: '表格计算' },
    { id: 'statistics', icon: <BarChart2 className="w-5 h-5" />, label: '表格统计' },
    { id: 'merge', icon: <GitMerge className="w-5 h-5" />, label: '表格合并' },
    { id: 'multiMerge', icon: <Files className="w-5 h-5" />, label: '多表格合并' },
    { id: 'standard', icon: <BookOpen className="w-5 h-5" />, label: '碳计量标准' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 bg-white p-1 rounded-lg shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors
            ${activeTab === tab.id
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
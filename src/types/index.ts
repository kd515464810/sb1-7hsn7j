export interface ColumnInfo {
  key: string;
  title: string;
}

export interface ProcessingConfig {
  type: 'calculate' | 'statistics' | 'merge' | 'multiMerge';
  params: CalculateParams | StatisticsParams | MergeParams | MultiMergeParams;
}

export interface CalculateParams {
  formula: string;
  targetColumn: string;
}

export interface StatisticsParams {
  groupByColumn: string;
  dataColumns: string[];
  operation: 'sum' | 'average' | 'count' | 'max' | 'min';
}

export interface MergeParams {
  file1Column: string;
  file2Column: string;
}

export interface MultiMergeParams {
  skipRows: number;
}

export interface ProcessingResult {
  success: boolean;
  data?: any[];
  error?: string;
}
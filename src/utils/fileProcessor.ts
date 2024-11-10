import * as XLSX from 'xlsx';
import { ProcessingConfig, ProcessingResult, ColumnInfo } from '../types';

export async function readFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };

    reader.readAsBinaryString(file);
  });
}

export function getColumns(data: any[]): ColumnInfo[] {
  if (data.length === 0) return [];
  const firstRow = data[0];
  return Object.keys(firstRow).map(key => ({
    key,
    title: key,
  }));
}

export async function processFiles(files: File[], config: ProcessingConfig): Promise<ProcessingResult> {
  try {
    switch (config.type) {
      case 'calculate':
        return await processCalculation(files[0], config.params);
      case 'statistics':
        return await processStatistics(files[0], config.params);
      case 'merge':
        return await processMerge(files[0], files[1], config.params);
      case 'multiMerge':
        return await processMultiMerge(files, config.params);
      default:
        return { success: false, error: '不支持的处理类型' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function processCalculation(file: File, params: any): Promise<ProcessingResult> {
  const data = await readFile(file);
  const { formula, targetColumn } = params;

  const processedData = data.map(row => {
    const result = evaluateFormula(formula, row);
    return { ...row, [targetColumn]: result };
  });

  return { success: true, data: processedData };
}

function evaluateFormula(formula: string, row: any): number {
  // 替换公式中的列名为实际值
  let evaluatedFormula = formula;
  Object.keys(row).forEach(key => {
    const regex = new RegExp(key, 'g');
    evaluatedFormula = evaluatedFormula.replace(regex, row[key]);
  });
  
  try {
    return eval(evaluatedFormula);
  } catch (error) {
    throw new Error('公式计算错误');
  }
}

async function processStatistics(file: File, params: any): Promise<ProcessingResult> {
  const data = await readFile(file);
  const { groupByColumn, dataColumns, operation } = params;

  const groups = new Map();
  
  data.forEach(row => {
    const groupKey = row[groupByColumn];
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey).push(row);
  });

  const result = Array.from(groups.entries()).map(([key, rows]) => {
    const stats: any = { [groupByColumn]: key };
    
    dataColumns.forEach(col => {
      const values = rows.map(row => parseFloat(row[col])).filter(v => !isNaN(v));
      
      switch (operation) {
        case 'sum':
          stats[`${col}_sum`] = values.reduce((a, b) => a + b, 0);
          break;
        case 'average':
          stats[`${col}_avg`] = values.reduce((a, b) => a + b, 0) / values.length;
          break;
        case 'count':
          stats[`${col}_count`] = values.length;
          break;
        case 'max':
          stats[`${col}_max`] = Math.max(...values);
          break;
        case 'min':
          stats[`${col}_min`] = Math.min(...values);
          break;
      }
    });
    
    return stats;
  });

  return { success: true, data: result };
}

async function processMerge(file1: File, file2: File, params: any): Promise<ProcessingResult> {
  const data1 = await readFile(file1);
  const data2 = await readFile(file2);
  const { file1Column, file2Column } = params;

  const lookup = new Map(data2.map(row => [row[file2Column], row]));
  
  const result = data1.map(row1 => {
    const row2 = lookup.get(row1[file1Column]);
    return row2 ? { ...row1, ...row2 } : row1;
  });

  return { success: true, data: result };
}

async function processMultiMerge(files: File[], params: any): Promise<ProcessingResult> {
  const { skipRows } = params;
  
  const allData = await Promise.all(files.map(async file => {
    const data = await readFile(file);
    return data.slice(skipRows);
  }));

  const mergedData = allData.flat();
  return { success: true, data: mergedData };
}

export function downloadProcessedFile(data: any[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Processed');
  
  XLSX.writeFile(wb, `processed_${filename}`);
}
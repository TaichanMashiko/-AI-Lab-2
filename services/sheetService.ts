import { SHEET_CSV_URL } from '../constants';
import { StudentData } from '../types';

/**
 * Fetches the Google Sheet data as CSV and parses it to find a student by email.
 */
export const fetchStudentData = async (targetEmail: string): Promise<StudentData | null> => {
  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    // Normalize target email for comparison
    const normalizedTarget = targetEmail.trim().toLowerCase();

    // Iterate through rows (skipping header if necessary, usually row 0 is header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      // Column Mapping based on description:
      // 0: 氏名 (Name)
      // 1: メールアドレス (Email)
      // 2: 出席番号 (Student Number)
      // 3: ID
      // 4: PW
      
      if (row.length >= 5) {
        const rowEmail = row[1]?.trim().toLowerCase();
        
        if (rowEmail === normalizedTarget) {
          return {
            name: row[0]?.trim() || 'Unknown',
            email: row[1]?.trim() || '',
            studentNumber: row[2]?.trim() || '',
            userId: row[3]?.trim() || 'Not Set',
            password: row[4]?.trim() || 'Not Set'
          };
        }
      }
    }

    return null; // Not found
  } catch (error) {
    console.error("Error processing sheet data:", error);
    throw error;
  }
};

/**
 * A simple CSV parser that handles basic quoted values.
 * For production with complex data, libraries like PapaParse are recommended.
 */
const parseCSV = (text: string): string[][] => {
  const result: string[][] = [];
  let row: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentVal += '"';
        i++; // skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(currentVal);
        currentVal = '';
      } else if (char === '\n' || char === '\r') {
        if (currentVal || row.length > 0) {
          row.push(currentVal);
          result.push(row);
        }
        row = [];
        currentVal = '';
        // Handle \r\n sequence
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentVal += char;
      }
    }
  }
  // Push last row if exists
  if (currentVal || row.length > 0) {
    row.push(currentVal);
    result.push(row);
  }
  
  return result;
};
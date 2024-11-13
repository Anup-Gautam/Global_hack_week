import { createWorker } from 'tesseract.js';
import type { ExtractedText } from '../types/business-card';

export async function extractTextFromImage(imageUrl: string): Promise<ExtractedText> {
  const worker = await createWorker('eng');
  
  try {
    const result = await worker.recognize(imageUrl);
    await worker.terminate();
    
    return {
      text: result.data.text,
      confidence: result.data.confidence
    };
  } catch (error) {
    await worker.terminate();
    throw error;
  }
}

export function parseBusinessCard(text: string) {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  
  // Basic parsing logic - can be enhanced with regex patterns
  const result = {
    name: lines[0] || '', // Usually the first line is the name
    title: lines[1] || '', // Second line is often the title
    company: '',
    phone: '',
    email: '',
    website: '',
    address: ''
  };

  lines.forEach(line => {
    // Phone number detection
    if (line.match(/[\d-+()]{10,}/)) {
      result.phone = line;
    }
    // Email detection
    else if (line.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
      result.email = line;
    }
    // Website detection
    else if (line.match(/www\.|http|\.com|\.org|\.net/i)) {
      result.website = line;
    }
    // Company detection (if contains common company indicators)
    else if (line.match(/inc\.|corp\.|ltd\.|limited|company/i)) {
      result.company = line;
    }
    // Address detection (if contains numbers and common address words)
    else if (line.match(/\d+.*(street|st|avenue|ave|road|rd|drive|dr|lane|ln|boulevard|blvd)/i)) {
      result.address = line;
    }
  });

  return result;
}
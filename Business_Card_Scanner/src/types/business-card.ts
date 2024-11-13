export interface BusinessCardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface ExtractedText {
  text: string;
  confidence: number;
}
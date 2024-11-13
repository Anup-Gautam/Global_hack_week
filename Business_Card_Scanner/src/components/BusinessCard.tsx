import React, { useEffect, useState } from 'react';
import { Phone, Mail, Globe, MapPin, Building2, Loader2 } from 'lucide-react';
import { extractTextFromImage, parseBusinessCard } from '../utils/textExtractor';
import type { BusinessCardData } from '../types/business-card';

interface BusinessCardProps {
  imageUrl: string;
}

export default function BusinessCard({ imageUrl }: BusinessCardProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string>('');
  const [cardData, setCardData] = useState<BusinessCardData>({
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    address: ''
  });

  useEffect(() => {
    async function processImage() {
      try {
        setIsProcessing(true);
        setError('');
        
        const extractedText = await extractTextFromImage(imageUrl);
        const parsedData = parseBusinessCard(extractedText.text);
        
        setCardData(parsedData);
      } catch (err) {
        setError('Failed to process the business card. Please try again.');
        console.error('OCR Error:', err);
      } finally {
        setIsProcessing(false);
      }
    }

    processImage();
  }, [imageUrl]);

  if (isProcessing) {
    return (
      <div className="w-full max-w-md h-96 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Processing business card...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <img
          src={imageUrl}
          alt="Business Card"
          className="w-full h-full object-contain p-4"
        />
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{cardData.name || 'Name not detected'}</h2>
        <p className="text-gray-600 mb-4">{cardData.title || 'Title not detected'}</p>
        
        <div className="space-y-3">
          {cardData.company && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Building2 className="w-5 h-5" />
              <span>{cardData.company}</span>
            </div>
          )}
          
          {cardData.phone && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>{cardData.phone}</span>
            </div>
          )}
          
          {cardData.email && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>{cardData.email}</span>
            </div>
          )}
          
          {cardData.website && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Globe className="w-5 h-5" />
              <span>{cardData.website}</span>
            </div>
          )}
          
          {cardData.address && (
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{cardData.address}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
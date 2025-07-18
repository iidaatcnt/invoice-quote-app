"use client";

import DocumentForm from '@/components/DocumentForm';
import { Document } from '@/types';

import { saveDocument } from '@/lib/documentStorage';

export default function QuotePage() {
  const handleSubmit = (data: Document) => {
    saveDocument(data);
    alert('見積書が保存されました！');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">見積書作成</h1>
      <DocumentForm documentType="quote" onSubmit={handleSubmit} />
    </div>
  );
}

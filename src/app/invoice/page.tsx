"use client";

import DocumentForm from '@/components/DocumentForm';import { Document } from '@/types';import { saveDocument } from '@/lib/documentStorage';

export default function InvoicePage() {
  const handleSubmit = (data: Document) => {
    saveDocument(data);
    alert('請求書が保存されました！');
  };
  return (    <div>      <h1 className="text-3xl font-bold mb-4">請求書作成</h1>      <DocumentForm documentType="invoice" onSubmit={handleSubmit} />    </div>  );}

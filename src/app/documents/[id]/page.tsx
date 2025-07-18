"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DocumentForm from '@/components/DocumentForm';
import { getDocumentById, saveDocument } from '@/lib/documentStorage';
import { Document } from '@/types';

export default function EditDocumentPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [document, setDocument] = useState<Document | undefined>(undefined);

  useEffect(() => {
    if (id && typeof id === 'string') {
      setDocument(getDocumentById(id));
    }
  }, [id]);

  const handleSubmit = (data: Document) => {
    saveDocument(data);
    alert('ドキュメントが更新されました！');
    router.push('/documents'); // 一覧ページに戻る
  };

  if (!document) {
    return <div className="text-center py-8">ドキュメントが見つかりません。</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">ドキュメント編集</h1>
      <DocumentForm documentType={document.type} initialData={document} onSubmit={handleSubmit} />
    </div>
  );
}

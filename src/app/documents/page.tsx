"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDocuments, deleteDocument } from '@/lib/documentStorage';
import { Document } from '@/types';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('本当にこのドキュメントを削除しますか？')) {
      deleteDocument(id);
      setDocuments(getDocuments()); // 更新されたリストを再取得
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">保存されたドキュメント</h1>
      {documents.length === 0 ? (
        <p>まだドキュメントがありません。見積書または請求書を作成してください。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{doc.type === 'quote' ? '見積書' : '請求書'}</h2>
              <p><strong>クライアント:</strong> {doc.client.name}</p>
              <p><strong>日付:</strong> {doc.date}</p>
              <p><strong>合計:</strong> ¥{doc.total.toFixed(2)}</p>
              <div className="mt-4 flex space-x-2">
                <Link href={`/documents/${doc.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    編集
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

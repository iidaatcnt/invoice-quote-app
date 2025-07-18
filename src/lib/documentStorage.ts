import { Document } from '@/types';

const STORAGE_KEY = 'invoiceQuoteDocuments';

export const saveDocument = (document: Document) => {
  const documents = getDocuments();
  const existingIndex = documents.findIndex((doc) => doc.id === document.id);
  if (existingIndex > -1) {
    documents[existingIndex] = document;
  } else {
    documents.push(document);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
};

export const getDocuments = (): Document[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getDocumentById = (id: string): Document | undefined => {
  const documents = getDocuments();
  return documents.find((doc) => doc.id === id);
};

export const deleteDocument = (id: string) => {
  const documents = getDocuments();
  const updatedDocuments = documents.filter((doc) => doc.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDocuments));
};

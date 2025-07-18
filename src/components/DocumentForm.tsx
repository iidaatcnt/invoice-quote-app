"use client";

import React, { useState, useEffect } from 'react';
import { Item, ClientInfo, CompanyInfo, Document } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface DocumentFormProps {
  documentType: 'quote' | 'invoice';
  initialData?: Document;
  onSubmit: (data: Document) => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  documentType,
  initialData,
  onSubmit,
}) => {
  const [client, setClient] = useState<ClientInfo>(initialData?.client || {
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [company, setCompany] = useState<CompanyInfo>(initialData?.company || {
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [items, setItems] = useState<Item[]>(initialData?.items || [
    { id: uuidv4(), description: '', quantity: 1, unitPrice: 0 },
  ]);
  const [date, setDate] = useState<string>(initialData?.date || new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>(initialData?.dueDate || '');
  const [taxRate, setTaxRate] = useState<number>(initialData?.taxRate || 0.10); // 10% 消費税
  const [taxCalculationType, setTaxCalculationType] = useState<'inclusive' | 'exclusive'>(initialData?.taxCalculationType || 'exclusive'); // 外税をデフォルト
  const [notes, setNotes] = useState<string>(initialData?.notes || '');

  const calculateTotals = () => {
    let calculatedSubtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    let calculatedTaxAmount = 0;
    let calculatedTotal = 0;

    if (taxCalculationType === 'exclusive') {
      calculatedTaxAmount = calculatedSubtotal * taxRate;
      calculatedTotal = calculatedSubtotal + calculatedTaxAmount;
    } else { // inclusive
      calculatedTotal = calculatedSubtotal;
      calculatedSubtotal = calculatedTotal / (1 + taxRate);
      calculatedTaxAmount = calculatedTotal - calculatedSubtotal;
    }

    return { subtotal: calculatedSubtotal, taxAmount: calculatedTaxAmount, total: calculatedTotal };
  };

  const { subtotal, taxAmount, total } = calculateTotals();

  useEffect(() => {
    // taxCalculationType または items が変更されたときに合計を再計算
    const { subtotal: newSubtotal, taxAmount: newTaxAmount, total: newTotal } = calculateTotals();
    // 必要に応じてstateを更新（ここでは直接使用しているので不要だが、もしstateとして保持するなら）
  }, [items, taxRate, taxCalculationType]);

  const handleItemChange = (id: string, field: keyof Item, value: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { id: uuidv4(), description: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDocument: Document = {
      id: initialData?.id || uuidv4(),
      type: documentType,
      date,
      dueDate: documentType === 'invoice' ? dueDate : undefined,
      client,
      company,
      items,
      subtotal,
      taxRate,
      taxAmount,
      total,
      taxCalculationType,
      notes,
    };
    onSubmit(newDocument);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{documentType === 'quote' ? '見積書' : '請求書'}情報</h2>

      {/* Company Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">自社情報</h3>
          <input
            type="text"
            placeholder="会社名"
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="住所"
            value={company.address}
            onChange={(e) => setCompany({ ...company, address: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="電話番号"
            value={company.phone}
            onChange={(e) => setCompany({ ...company, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="email"
            placeholder="メールアドレス"
            value={company.email}
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="納税者番号 (任意)"
            value={company.taxId || ''}
            onChange={(e) => setCompany({ ...company, taxId: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Client Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">クライアント情報</h3>
          <input
            type="text"
            placeholder="会社名"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="住所"
            value={client.address}
            onChange={(e) => setClient({ ...client, address: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="電話番号"
            value={client.phone}
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="email"
            placeholder="メールアドレス"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      </div>

      {/* Document Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">日付:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {documentType === 'invoice' && (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">支払期限:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}
      </div>

      {/* Tax Calculation Type */}
      <div className="flex items-center space-x-4">
        <label className="block text-gray-700 text-sm font-bold">消費税計算:</label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="taxCalculationType"
            value="exclusive"
            checked={taxCalculationType === 'exclusive'}
            onChange={() => setTaxCalculationType('exclusive')}
          />
          <span className="ml-2">外税</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="taxCalculationType"
            value="inclusive"
            checked={taxCalculationType === 'inclusive'}
            onChange={() => setTaxCalculationType('inclusive')}
          />
          <span className="ml-2">内税</span>
        </label>
      </div>

      {/* Items */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">品目</h3>
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <input
              type="text"
              placeholder="品目名"
              value={item.description}
              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              placeholder="数量"
              value={item.quantity}
              onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded"
              min="1"
              required
            />
            <input
              type="number"
              placeholder="単価"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value))}
              className="p-2 border border-gray-300 rounded"
              min="0"
              step="0.01"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(item.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              削除
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          品目を追加
        </button>
      </div>

      {/* Totals */}
      <div className="text-right space-y-2">
        <p>小計: ¥{subtotal.toFixed(2)}</p>
        <div className="flex justify-end items-center">
          <label className="mr-2">消費税率:</label>
          <input
            type="number"
            value={taxRate * 100}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) / 100)}
            className="w-20 p-2 border border-gray-300 rounded text-right"
            min="0"
            step="0.01"
          />
          <span>%</span>
        </div>
        <p>消費税: ¥{taxAmount.toFixed(2)}</p>
        <p className="text-xl font-bold">合計: ¥{total.toFixed(2)}</p>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">備考:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-24"
          placeholder="備考を入力してください"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-3 rounded-lg font-bold text-lg hover:bg-green-600"
      >
        {documentType === 'quote' ? '見積書を作成' : '請求書を作成'}
      </button>
    </form>
  );
};

export default DocumentForm;

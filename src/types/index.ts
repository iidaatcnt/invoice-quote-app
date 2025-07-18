export interface Item {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ClientInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId?: string; // 納税者番号など
}

export interface Document {
  id: string;
  type: 'quote' | 'invoice';
  date: string;
  dueDate?: string; // 請求書のみ
  client: ClientInfo;
  company: CompanyInfo;
  items: Item[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  taxCalculationType: 'inclusive' | 'exclusive'; // 内税 or 外税
  notes?: string;
}

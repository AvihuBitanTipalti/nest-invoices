export interface Invoice {
  id: number;
  invoiceNumber: string;
  dateIssued: Date;
  dueDate: Date;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: any[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  notes: string;
}

import { Injectable } from '@nestjs/common';
import { Invoice } from 'src/interfaces/invoice.interface';

@Injectable()
export class InvoiceService {
  private invoices: Invoice[] = [];

  create(invoiceData: Omit<Invoice, 'id'>): Invoice {
    const newInvoice: Invoice = {
      id: this.invoices.length + 1,
      ...invoiceData,
    };
    this.invoices.push(newInvoice);
    return newInvoice;
  }

  findAll(): Invoice[] {
    return this.invoices;
  }

  findOne(id: number): Invoice | undefined {
    return this.invoices.find((invoice) => invoice.id === id);
  }

  update(id: number, updateData: Partial<Omit<Invoice, 'id'>>): Invoice | null {
    const invoiceIndex = this.invoices.findIndex((inv) => inv.id === id);
    if (invoiceIndex >= 0) {
      this.invoices[invoiceIndex] = {
        ...this.invoices[invoiceIndex],
        ...updateData,
      };
      return this.invoices[invoiceIndex];
    }
    return null;
  }

  delete(id: number): boolean {
    const invoiceIndex = this.invoices.findIndex((inv) => inv.id === id);
    if (invoiceIndex >= 0) {
      this.invoices.splice(invoiceIndex, 1);
      return true;
    }
    return false;
  }
}

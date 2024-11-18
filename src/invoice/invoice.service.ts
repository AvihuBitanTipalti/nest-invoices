import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Invoice } from '../interfaces/invoice.interface';
import {
  CreateInvoiceSchema,
  CreateInvoiceSchemaType,
} from 'src/invoice/schemas/create-invoice.schema';
import { UpdateInvoiceSchemaType } from 'src/invoice/schemas/update-invoice.schema';

@Injectable()
export class InvoiceService {
  private invoices: Invoice[] = [];

  create(invoiceData: CreateInvoiceSchemaType): Invoice {
    const parseResult = CreateInvoiceSchema.safeParse(invoiceData);
    if (!parseResult.success) {
      throw new BadRequestException(parseResult.error.errors);
    }

    const {
      invoiceNumber,
      dateIssued,
      dueDate,
      customerName,
      customerEmail,
      customerAddress,
      items,
      subtotal,
      tax,
      total,
      status,
      notes,
    } = parseResult.data;

    const newInvoice: Invoice = {
      id: this.invoices.length + 1,
      invoiceNumber,
      dateIssued: new Date(dateIssued),
      dueDate: new Date(dueDate),
      customerName,
      customerEmail,
      customerAddress,
      items,
      subtotal,
      tax,
      total,
      status,
      notes,
    };

    this.invoices.push(newInvoice);
    return newInvoice;
  }
  findAll(): Invoice[] {
    return this.invoices;
  }

  findOne(id: number): Invoice | undefined {
    const invoice = this.invoices.find((invoice) => invoice.id === id);
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  update(id: number, updateData: UpdateInvoiceSchemaType): Invoice | null {
    const invoiceIndex = this.invoices.findIndex((inv) => inv.id === id);
    if (invoiceIndex >= 0) {
      this.invoices[invoiceIndex] = {
        ...this.invoices[invoiceIndex],
        ...updateData,
        dateIssued: new Date(
          updateData.dateIssued || this.invoices[invoiceIndex].dateIssued,
        ),
        dueDate: new Date(
          updateData.dueDate || this.invoices[invoiceIndex].dueDate,
        ),
      };
      return this.invoices[invoiceIndex];
    }
    throw new NotFoundException('Invoice not found');
  }

  delete(id: number): boolean {
    const invoiceIndex = this.invoices.findIndex((inv) => inv.id === id);
    if (invoiceIndex >= 0) {
      this.invoices.splice(invoiceIndex, 1);
      return true;
    }
    throw new NotFoundException('Invoice not found');
  }
}

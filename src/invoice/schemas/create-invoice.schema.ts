import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
  invoiceNumber: z.string(),
  dateIssued: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format, must be ISO 8601',
  }),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format, must be ISO 8601',
  }),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerAddress: z.string(),
  items: z.array(z.any()),
  subtotal: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),
  status: z.enum(['Paid', 'Unpaid', 'Overdue']),
  notes: z.string().optional(),
});

export type CreateInvoiceSchemaType = z.infer<typeof CreateInvoiceSchema>;

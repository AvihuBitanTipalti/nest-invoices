import { CreateInvoiceSchema } from 'src/invoice/schemas/create-invoice.schema';
import { z } from 'zod';

export const UpdateInvoiceSchema = CreateInvoiceSchema.partial();

export type UpdateInvoiceSchemaType = z.infer<typeof UpdateInvoiceSchema>;

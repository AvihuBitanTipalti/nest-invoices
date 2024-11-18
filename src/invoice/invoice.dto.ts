import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({ description: 'The invoice number', type: String })
  invoiceNumber: string;

  @ApiProperty({ description: 'Date the invoice was issued', type: Date })
  dateIssued: Date;

  @ApiProperty({ description: 'Date the invoice is due', type: Date })
  dueDate: Date;

  @ApiProperty({ description: 'Name of the customer', type: String })
  customerName: string;

  @ApiProperty({
    description: 'Email of the customer',
    type: String,
    format: 'email',
  })
  customerEmail: string;

  @ApiProperty({ description: 'Address of the customer', type: String })
  customerAddress: string;

  @ApiProperty({ description: 'List of items in the invoice', type: Array })
  items: any[];

  @ApiProperty({ description: 'Subtotal amount', type: Number })
  subtotal: number;

  @ApiProperty({ description: 'Total tax amount', type: Number })
  tax: number;

  @ApiProperty({ description: 'Total invoice amount', type: Number })
  total: number;

  @ApiProperty({
    description: 'Status of the invoice',
    enum: ['Paid', 'Unpaid', 'Overdue'],
  })
  status: 'Paid' | 'Unpaid' | 'Overdue';

  @ApiProperty({
    description: 'Additional notes',
    required: false,
    type: String,
  })
  notes: string;
}
export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}

import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import {
  CreateInvoiceSchema,
  CreateInvoiceSchemaType,
} from 'src/invoice/schemas/create-invoice.schema';
import {
  UpdateInvoiceSchema,
  UpdateInvoiceSchemaType,
} from 'src/invoice/schemas/update-invoice.schema';
import { CreateInvoiceDto, UpdateInvoiceDto } from 'src/invoice/invoice.dto';

@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create an invoice' })
  @ApiResponse({
    status: 201,
    description: 'The invoice has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid payload.' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    const parseResult = CreateInvoiceSchema.safeParse(createInvoiceDto);
    if (!parseResult.success) {
      throw new BadRequestException(parseResult.error.errors);
    }
    const invoiceData: CreateInvoiceSchemaType = parseResult.data;
    return this.invoiceService.create(invoiceData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'Return all invoices.' })
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by ID' })
  @ApiResponse({ status: 200, description: 'Return invoice information.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an invoice' })
  @ApiResponse({
    status: 200,
    description: 'The invoice has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    const parseResult = UpdateInvoiceSchema.safeParse(updateInvoiceDto);
    if (!parseResult.success) {
      throw new BadRequestException(parseResult.error.errors);
    }
    const updateData: UpdateInvoiceSchemaType = parseResult.data;
    return this.invoiceService.update(Number(id), updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an invoice' })
  @ApiResponse({
    status: 200,
    description: 'The invoice has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  delete(@Param('id') id: string) {
    return this.invoiceService.delete(Number(id));
  }
}

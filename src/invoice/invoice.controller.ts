import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from 'src/interfaces/invoice.interface';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() invoiceData: Omit<Invoice, 'id'>) {
    return this.invoiceService.create(invoiceData);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Omit<Invoice, 'id'>>,
  ) {
    return this.invoiceService.update(Number(id), updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.invoiceService.delete(Number(id));
  }
}

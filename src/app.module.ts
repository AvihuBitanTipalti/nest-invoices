import { Module } from '@nestjs/common';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [InvoiceModule],
})
export class AppModule {}

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [InvoiceModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Applies to all routes
  }
}

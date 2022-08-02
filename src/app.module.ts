import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummaryModule } from './summary/summary.module';
import { ReportModule } from './report/report.module';
import { KNEX_CONFIG } from './database/config';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({ config: KNEX_CONFIG }),
    SummaryModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportType } from 'src/consts';
import { CreateReportDto, UpdateReportDto } from 'src/dtos/report.dto';
import { ReportData } from 'src/interfaces/ReportData';
import { log } from 'console';

@Controller('all-reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('')
  getAllReports(): Promise<ReportData[]> {
    console.log(process.env);

    // console.log(
    //   process.env.DATABASE_PASSWORD,
    //   typeof process.env.DATABASE_PASSWORD,
    // );

    return this.reportService.getAllReports();
  }
  @Get('id/:id')
  getReportById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReportData | string> {
    return this.reportService.getReportById(id);
  }

  @Get(':type')
  getReportByType(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): Promise<ReportData[] | string> {
    return this.reportService.getReportByType(type);
  }

  @Post()
  createReport(@Body() body: CreateReportDto): Promise<ReportData> {
    return this.reportService.createReport(body);
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReportData | string> {
    return this.reportService.updateReport(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | string> {
    // ask Roei why this is not print to postman the message when the id dosent exist
    return this.reportService.deleteReportById(id);
  }
}

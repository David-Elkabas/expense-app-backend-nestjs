import { Injectable } from '@nestjs/common';
import { data } from '../tempData';
import { v4 as uuid } from 'uuid';
import { UpdateReport } from '../interfaces/updateReport';
import { ReportData } from '../interfaces/ReportData';
import { CreateReport } from '../interfaces/CreateReport';
import { ReportType } from '../consts';

@Injectable()
export class ReportService {
  getHello(): string {
    return 'Hello World!';
  }

  getAllReports(): Array<ReportData> {
    // TODO: connect to REAL DB
    return data.reports;
  }

  getReportById(id: string): ReportData | string {
    // TODO: connect to REAL DB
    const oneReport = data.reports.find((income) => id === income.id);
    if (!oneReport) {
      return `error at get id. didn't found - ${id}`;
    } else {
      return oneReport;
    }
  }

  getReportByType(type: string): Array<ReportData> | string {
    if (type !== ReportType.EXPENSE && type !== ReportType.INCOME)
      return `${type} wasn't found`;
    if (type === ReportType.EXPENSE) {
      // TODO: connect to REAL DB
      return data.reports.filter(
        (income) => income.type === ReportType.EXPENSE,
      );
    } else {
      // mean type == incomes
      // TODO: connect to REAL DB
      return data.reports.filter((income) => income.type === ReportType.INCOME);
    }
  }

  deleteReportById(id: string): void | string {
    const indexOfDeleteReport = data.reports.findIndex(
      (report) => report.id === id,
    );
    if (indexOfDeleteReport === -1) {
      console.log('here');
      return `error at deleting. didn't found - ${id}`;
    }
    // TODO: connect to REAL DB
    data.reports.splice(indexOfDeleteReport, 1);

    console.log(`deleted id: ${id}`);
  }

  updateReport(id: string, body: UpdateReport): ReportData | string {
    const selectedReport = data.reports.find((report) => report.id === id);
    if (!selectedReport) {
      return `error at updating, didn't found id- ${id}`;
    }
    const reportIndex = data.reports.findIndex(
      (report) => report.id === selectedReport.id,
    );

    // TODO: connect to REAL DB
    data.reports[reportIndex] = {
      ...data.reports[reportIndex],
      ...body,
      updateDate: new Date(),
    };

    return data.reports[reportIndex];
  }

  createReport(body: CreateReport): ReportData {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      type: body.type,
      createDate: new Date(),
      updateDate: new Date(),
    };

    // TODO: connect to REAL DB
    data.reports.push(newReport);
    return newReport;
  }
}

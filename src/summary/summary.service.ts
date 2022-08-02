import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/consts';
import { ReportData } from 'src/interfaces/ReportData';
import { Summary } from 'src/interfaces/Summary';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  async getCalculatedSummary(): Promise<Summary> {
    const allIncomes: any = await this.reportService.getReportByType(
      ReportType.INCOME,
    );

    const totalIncome = allIncomes.reduce((sum: number, report: ReportData) => {
      return sum + report.amount;
    }, 0);

    const allExpense: any = await this.reportService.getReportByType(
      ReportType.EXPENSE,
    );
    const totalExpense: number = allExpense.reduce(
      (sum: number, report: ReportData) => {
        return sum + report.amount;
      },
      0,
    );

    return {
      income: totalIncome,
      outcomes: totalExpense,
      total: totalIncome - totalExpense,
    };
  }
}

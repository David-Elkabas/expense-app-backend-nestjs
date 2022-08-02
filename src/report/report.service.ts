import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { data } from '../tempData';
import { v4 as uuid } from 'uuid';
import { UpdateReport } from '../interfaces/updateReport';
import { ReportData } from '../interfaces/ReportData';
import { CreateReport } from '../interfaces/CreateReport';
import { ReportType } from '../consts';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class ReportService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  getHello(): string {
    return 'Hello World!';
  }

  //! GET
  async getAllReports(): Promise<ReportData[]> {
    const reports: Array<ReportData> = await this.knex.table('reports');
    return reports;
    // return data.reports
  }

  async getReportById(id: string): Promise<ReportData | string> {
    try {
      const oneReport: ReportData = await this.knex<ReportData>('reports')
        .select()
        .where('id', id)
        .first();
      if (oneReport) return oneReport;
      else throw new NotFoundException(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
      // return `ERROR with id: ${id} check the query that sent`;
    }
  }

  async getReportByType(type: string): Promise<ReportData[] | string> {
    if (type !== ReportType.EXPENSE && type !== ReportType.INCOME)
      return `${type} wasn't found`;

    const Reports: ReportData[] = await this.knex<ReportData>('reports')
      .select()
      .where('type', type);

    return Reports;
  }

  //! CREATE a new report
  async createReport(body: CreateReport): Promise<ReportData> {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      type: body.type,
      createDate: new Date(),
      updateDate: new Date(),
    };
    try {
      await this.knex('reports').insert(newReport);
      return newReport;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  //! UPDATE
  async updateReport(
    id: string,
    body: UpdateReport,
  ): Promise<ReportData | string> {
    try {
      const updateReport = { ...body, updateDate: new Date() };
      await this.knex('reports').where('id', id).update(updateReport);
      return await this.knex('reports').where('id', id).first();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  // }

  //! DELETE
  async deleteReportById(id: string): Promise<void | string> {
    try {
      const deleteResponse = await this.knex('reports').where('id', id).del();
      if (!deleteResponse) {
        throw new NotFoundException(id);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    // const indexOfDeleteReport = data.reports.findIndex(
    //   (report) => report.id === id,
    // );
    // if (indexOfDeleteReport === -1) {
    //   console.log('here');
    //   return `error at deleting. didn't found - ${id}`;
    // }
    // // TODO: connect to REAL DB
    // data.reports.splice(indexOfDeleteReport, 1);

    // console.log(`deleted id: ${id}`);
  }
}

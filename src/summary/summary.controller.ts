import { Controller, Get } from '@nestjs/common';
import { Summary } from 'src/interfaces/Summary';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  getCalculatedSummary(): Summary {
    return this.summaryService.getCalculatedSummary();
  }
}

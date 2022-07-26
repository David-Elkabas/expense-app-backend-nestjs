import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { isTypedArray } from 'util/types';

export class CreateReportDto {
  // for validate that the user don't send any forbidden data.

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class UpdateReportDto {
  // because we don't have to supply all of the arguments. - same as above but added the @IsOptional
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type: string;
}

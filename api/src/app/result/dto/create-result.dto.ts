import {
  IsString,
  IsEnum,
  IsDateString,
  IsNotEmpty,
  ValidateIf,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { STATUS } from 'src/constant/data';
import { Finding } from 'src/database/entities/result.entity';

export class CreateResultDto {
  @IsNotEmpty()
  @IsEnum([STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.SUCCESS, STATUS.FAILURE])
  status: STATUS.QUEUED | STATUS.IN_PROGRESS | STATUS.SUCCESS | STATUS.FAILURE;

  @IsNotEmpty()
  @IsString()
  repositoryName: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one finding is required.' })
  @ValidateIf((o) => o.status === STATUS.SUCCESS || o.status === STATUS.FAILURE)
  @IsNotEmpty({ message: 'Findings is required.' })
  findings: Finding[];

  @IsDateString()
  queuedAt: Date;

  @IsDateString()
  @ValidateIf(
    (o) =>
      o.status === STATUS.IN_PROGRESS ||
      o.status === STATUS.SUCCESS ||
      o.status === STATUS.FAILURE,
  )
  @IsNotEmpty({ message: 'ScanningAt is required.' })
  scanningAt?: Date | null;

  @IsDateString()
  @ValidateIf((o) => o.status === STATUS.SUCCESS || o.status === STATUS.FAILURE)
  @IsNotEmpty({ message: 'FinishedAt is required.' })
  finishedAt?: Date | null;
}

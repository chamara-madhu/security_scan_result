import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from 'src/database/entities/result.entity';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto): Promise<Result> {
    return this.resultService.create(createResultDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Result[]> {
    return this.resultService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Result> {
    return this.resultService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResultDto: UpdateResultDto,
  ): Promise<Result> {
    return this.resultService.update(id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.resultService.remove(id);
  }
}

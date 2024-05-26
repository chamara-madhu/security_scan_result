import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Result } from 'src/database/entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import {
    PAGINATION_DEFAULT_LIMIT,
    PAGINATION_MAX_LIMIT,
} from 'src/constant/data';

@Injectable()
export class ResultService {
    constructor(
        @InjectRepository(Result)
        private resultRepository: Repository<Result>,
    ) { }


    async create(createResultDto: CreateResultDto): Promise<Result> {
        createResultDto.queuedAt = createResultDto.queuedAt
            ? new Date(createResultDto.queuedAt)
            : null;
        createResultDto.scanningAt = createResultDto.scanningAt
            ? new Date(createResultDto.scanningAt)
            : null;
        createResultDto.finishedAt = createResultDto.finishedAt
            ? new Date(createResultDto.finishedAt)
            : null;

        const result = this.resultRepository.create(createResultDto);
        return this.resultRepository.save(result);
    }

    async findAll(query: PaginateQuery): Promise<any> {
        const queryBuilder = this.resultRepository.createQueryBuilder('result');

        const result = await paginate<Result>(query, queryBuilder, {
            sortableColumns: ['createdAt'],
            defaultLimit: PAGINATION_DEFAULT_LIMIT,
            maxLimit: PAGINATION_MAX_LIMIT,
            defaultSortBy: [['createdAt', 'DESC']],
        });

        return result;
    }

    async findOne(id: string): Promise<Result> {
        return this.resultRepository.findOne({
            where: { id },
        });
    }

    async update(id: string, updateResultDto: UpdateResultDto): Promise<Result> {
        await this.resultRepository.update(id, updateResultDto);
        return this.resultRepository.findOne({
            where: { id },
        });
    }

    async remove(id: string): Promise<void> {
        await this.resultRepository.delete(id);
    }
}

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';

export interface Finding {
    type: string;
    ruleId: string;
    location: {
        path: string;
        positions: { begin: { line: number } };
    };
    metadata: {
        description: string;
        severity: string;
    };
}

@Entity()
export class Result {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ['Queued', 'In Progress', 'Success', 'Failure'],
        nullable: false,
    })
    status: 'Queued' | 'In Progress' | 'Success' | 'Failure';

    @Column({ nullable: false })
    repositoryName: string;

    @Column('jsonb', { nullable: true })
    findings?: Finding[];

    @Column({ nullable: false })
    queuedAt: Date;

    @Column({ nullable: true })
    scanningAt?: Date;

    @Column({ nullable: true })
    finishedAt?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    validateScanningAt() {
        if (
            (this.status === 'In Progress' ||
                this.status === 'Success' ||
                this.status === 'Failure') &&
            !this.scanningAt
        ) {
            throw new Error('scanningAt is required.');
        }

        if (
            (this.status === 'Success' || this.status === 'Failure') &&
            !this.finishedAt
        ) {
            throw new Error('finishedAt is required.');
        }

        if (
            (this.status === 'Queued' || this.status === 'In Progress') &&
            this.findings !== null
        ) {
            throw new Error('Findings should be null.');
        }
    }
}

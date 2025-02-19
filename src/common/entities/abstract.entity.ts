import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @VersionColumn({ type: 'bigint', nullable: true })
  version: number;

  @Column({ type: 'bigint', nullable: true })
  createdByUserId: number;

  @Column({ type: 'bigint', nullable: true })
  updatedByUserId: number;

  @CreateDateColumn({ nullable: true })
  created: Date;

  @UpdateDateColumn({ nullable: true })
  lastModified: Date;
}

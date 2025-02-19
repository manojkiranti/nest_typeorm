import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from 'src/common/enums/status.enum';

@Entity({ name: 'roles' })
export class RolesEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;
}

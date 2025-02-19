import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesEntity } from './roles.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsPhoneNumber()
  @Column({ unique: true, nullable: true })
  phone: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @Column({ default: false })
  isSuperuser: boolean;

  @ManyToMany(() => RolesEntity, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'user_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: RolesEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string) {
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const salt = await bcrypt.genSalt();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}

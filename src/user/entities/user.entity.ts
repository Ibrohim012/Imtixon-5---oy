import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE'] })
  gender: string;

  @Column({ type: 'enum', enum: ['USER', 'ADMIN', 'SUPERADMIN'], default: 'USER' })
  role: string;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @Column({ nullable: true, type: 'timestamp' })
  emailVerificationTokenExpires: Date;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Order, order => order.user)
  orders?: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

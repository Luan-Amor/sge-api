import { Role } from '../../auth/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpfCnpj: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;


  constructor(user: Partial<User>){
    this.id = user?.id;
    this.cpfCnpj = user?.cpfCnpj;
    this.email = user?.email;
    this.gender = user?.gender;
    this.city = user?.city;
    this.password = user?.password;
    this.state = user?.state;
    this.role= user?.role;
  }
}

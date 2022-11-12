import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('enrollment')
export class Enrollment {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'event_id' })
  eventId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: string;

  @ManyToOne(() => Event, (event) => event.id)
  @JoinColumn({ name: 'event_id' })
  event: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ name: 'arrived_at', nullable: true })
  arrivedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor(userId?, eventId?, paid?: boolean) {
    this.userId = userId;
    this.eventId = eventId;
    this.paid = paid;
  }
}

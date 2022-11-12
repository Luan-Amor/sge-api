import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Video } from './video.entity';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  speaker: string;

  @Column({ name: 'ticket_price' })
  ticketPrice: number;

  @Column()
  spots: number;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToMany(() => Video, (videos) => videos, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable()
  videos: Video[];

  @Column({ type: 'date', name: 'start_event_date' })
  startEventDate: Date;

  @Column({ type: 'date', name: 'end_event_date' })
  endEventDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  update_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  constructor(event: Partial<Event>){
    this.name = event?.name;
    this.description = event?.description;
    this.speaker = event?.speaker;
    this.spots = event?.spots;
    this.ticketPrice = event?.ticketPrice;
    this.videos = event?.videos;
    this.id = event?.id;
    this.startEventDate = event?.startEventDate;
    this.endEventDate = event?.endEventDate;
    this.ownerId = event?.ownerId;
  }
}

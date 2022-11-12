import { User } from 'src/users/entities/user.entity';
import { Event } from '../entities/event.entity';
import { VideoDto } from './video.dto';

export class EventDto {
  id: number;

  name: string;

  description: string;

  speaker: string;

  ticketPrice: number;

  spots: number;

  owner: User;

  videos: VideoDto[];

  startEventDate: Date;

  endEventDate: Date;

  constructor(event?: Event) {
    this.id = event?.id;
    this.name = event?.name;
    this.description = event?.description;
    this.owner = event?.owner;
    this.speaker = event?.speaker;
    this.ticketPrice = event?.ticketPrice;
    this.spots = event?.spots;
    this.startEventDate = event?.startEventDate;
    this.endEventDate = event?.endEventDate;
    this.videos = event?.videos?.map((video) => new VideoDto(video));
  }
}

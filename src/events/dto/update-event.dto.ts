import { PartialType } from '@nestjs/mapped-types';
import { Video } from '../entities/video.entity';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  name: string;

  description: string;

  speaker: string;

  ticketPrice: number;

  spots: number;

  videos: Video[];

  startEventDate: Date;

  endEventDate: Date;
}

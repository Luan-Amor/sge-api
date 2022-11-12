import { User } from 'src/users/entities/user.entity';
import { Video } from '../entities/video.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  speaker: string;

  @IsNotEmpty()
  ticketPrice: number;

  @IsNotEmpty()
  spots: number;

  videos: Video[];

  @IsNotEmpty()
  startEventDate: Date;

  @IsNotEmpty()
  endEventDate: Date;
}

import { Video } from '../entities/video.entity';

export class VideoDto {
  id: number;

  name: string;

  description: string;

  url: string;

  constructor(video?: Video) {
    this.id = video?.id;
    this.name = video?.name;
    this.description = video?.description;
    this.url = video?.url;
  }
}

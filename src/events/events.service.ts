import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDto } from './dto/event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { VideoDto } from './dto/video.dto';
import { Event } from './entities/event.entity';
import { Video } from './entities/video.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    ownerId: string,
  ): Promise<EventDto> {
    const event = this.eventsRepository.create(createEventDto);
    event.ownerId = ownerId;
    return new EventDto(await this.eventsRepository.save(event));
  }

  async findAll() {
    return (
      await this.eventsRepository.find()
    ).map((event) => new EventDto(event));
  }
  
  async findAllByUser(id: string) {
    return (
      await this.eventsRepository.find({ where: { ownerId: id } })
    ).map((event) => new EventDto(event));
  }

  async findOne(id: number) {
    return new EventDto(await this.findEventById(id));
  }

  async update(ownerId: string, id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findEventById(id);
    validOwner(event, ownerId);
    this.eventsRepository.merge(event, updateEventDto);
    return new EventDto(await this.eventsRepository.save(event));
  }

  async remove(ownerId: string, id: number) {
    const event = await this.findEventById(id);
    validOwner(event, ownerId);
    await this.eventsRepository.softDelete(id);
  }

  async findEventById(id: number) {
    try {
      return await this.eventsRepository.findOne({
        where: { id },
        relations: { videos: true },
      });
    } catch (error) {
      throw new NotFoundException(`Evento não encontrado para o ID: ${id}`);
    }
  }

  async addVideo(ownerId: string, eventId: number, createVideoDto: VideoDto) {
    const event = await this.findEventById(eventId);
    const video: Video = createVideoDto;

    validOwner(event, ownerId);

    if (!event.videos) {
      event.videos = [];
    }

    event.videos.push(video);

    await this.eventsRepository.save(event);
  }
}
function validOwner(event: Event, ownerId: string) {
  if (event && event.ownerId != ownerId) {
    throw new BadRequestException("Usuário não possuí permissão para alterar este evento.");
  }
}


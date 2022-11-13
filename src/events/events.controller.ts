import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VideoDto } from './dto/video.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  findAllByUser(@Request() req: any) {
    return this.eventsService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Request() req: any,
    @Param('id') id: string, 
    @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(req.user.userId ,+id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Request() req: any, @Param('id') id: string) {
    return this.eventsService.remove(req.user.userId, +id);
  }

  @Post('/videos/:id')
  @UseGuards(JwtAuthGuard)
  addVideo(@Request() req: any, @Param('id') id: string, @Body() createVideoDto: VideoDto) {
    return this.eventsService.addVideo(req.user.userId, +id, createVideoDto);
  }
}

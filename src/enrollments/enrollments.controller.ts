import {
  Controller,
  Get,
  Post,
  UseGuards,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post(':eventId')
  @UseGuards(JwtAuthGuard)
  create(@Param('eventId') eventId: string, @Request() req: any) {
    return this.enrollmentsService.create(req.user.userId, +eventId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    return this.enrollmentsService.findAll(req.user.userId);
  }

  @Get(':eventId')
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req: any,  @Param('eventId') eventId: string) {
    return this.enrollmentsService.findOne(req.user.userId, +eventId);
  }

  @Patch('/payment/:eventId')
  @UseGuards(JwtAuthGuard)
  paid(@Request() req: any, @Param('eventId') eventId: string) {
    return this.enrollmentsService.updatePayment(req.user.userId, +eventId);
  }

  @Patch('/arrive/:eventId')
  @UseGuards(JwtAuthGuard)
  arrived(@Request() req: any, @Param('eventId') eventId: string) {
    return this.enrollmentsService.updateArrive(req.user.userId, +eventId);
  }

  @Delete(':eventId')
  @UseGuards(JwtAuthGuard)
  cancel(@Request() req: any, @Param('eventId') eventId: string) {
    return this.enrollmentsService.remove(req.user.userId, +eventId);
  }
}

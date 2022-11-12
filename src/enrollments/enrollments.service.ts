import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from '../events/events.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollRepository: Repository<Enrollment>,
    private readonly eventsService: EventsService,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, eventId: number) {
    const event = await this.eventsService.findEventById(eventId);
    await this.usersService.findUserById(userId);
    let paid = false;
    if (!event.ticketPrice || event.ticketPrice <= 0) {
      paid = true;
    }

    const entity = this.enrollRepository.create({ userId, eventId, paid });

    await this.enrollRepository.save(entity);
  }

  async findAll(userId: string) {
    return await this.enrollRepository.find({
      where: { userId },
      relations: { event: true },
    });
  }

  async updatePayment(userId: string, eventId: number) {
    const enroll = await this.getEnrollment(userId, eventId);
    if (!enroll.paid) {
      enroll.paid = true;
      this.enrollRepository.save(enroll);
    }
  }

  async updateArrive(userId: string, eventId: number) {
    const enroll = await this.getEnrollment(userId, eventId);
    if (!enroll.arrivedAt) {
      enroll.arrivedAt = new Date();
      this.enrollRepository.save(enroll);
    }
  }

  async remove(userId: string, eventId: number) {
    const enroll = await this.getEnrollment(userId, eventId);
    try {
      await this.enrollRepository.delete({ userId, eventId });
    } catch (error) {
      console.log(error);
    }
  }

  async getEnrollment(userId: string, eventId: number) {
    try {
      return await this.enrollRepository.findOne({
        where: { userId, eventId },
      });
    } catch (error) {
      throw new NotFoundException(
        'Inscrição não foi encontada para o usuário.',
      );
    }
  }

}

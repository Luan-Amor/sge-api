import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { Enrollment } from './entities/enrollment.entity';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [UsersModule, EventsModule, TypeOrmModule.forFeature([Enrollment])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}

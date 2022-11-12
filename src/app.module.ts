import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    EnrollmentsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'root'),
        database: configService.get('DB_DATABASE', 'postgres'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

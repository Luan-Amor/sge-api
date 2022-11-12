import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Role } from '../auth/role.enum';
import { EnrollmentsService } from './enrollments.service';
import { EventsService } from '../events/events.service';
import { Event } from '../events/entities/event.entity';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const user = new User({
    id: '1', name: 'fulano',
    email: 'fulano@email.com',
    password: '$2b$10$3paJujsKMUzh/B0BIDxBE.ltqZ.IeffxgtS5Hu0jEpxmj8aSDY0AC',
    gender: 'M', role: Role.User,
    city: 'Goiania',
    state: 'GO'});

const event = new Event({id: 1});

const enroll = new Enrollment('1', 1, false);

describe('EnrollmentService', () => {
    let service: EnrollmentsService;
    let userService: UsersService;
    let eventsService: EventsService;
    let repository: Repository<Enrollment>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            EnrollmentsService, 
            {
                provide: getRepositoryToken(Enrollment),
                useValue: {
                    save: jest.fn(),
                    create: jest.fn(),
                    find: jest.fn().mockResolvedValue([]),
                    delete: jest.fn(),
                    findOne: jest.fn().mockResolvedValue(enroll)
                }
            },
            {
                provide: EventsService,
                useValue: {
                    findEventById: jest.fn().mockReturnValue(event)
                }
            },
            {
            provide: UsersService,
            useValue: {
                findUserById: jest.fn().mockReturnValue(user),
            },
            },
        ],
    }).compile();

    service = module.get<EnrollmentsService>(EnrollmentsService);
    userService = module.get<UsersService>(UsersService);
    eventsService = module.get<EventsService>(EventsService);
    repository = module.get<Repository<Enrollment>>(getRepositoryToken(Enrollment));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
        expect(eventsService).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe('Create', () => {
        it('should create enroll with success', async () => {
            await service.create('1', 1);
            expect(repository.save).toBeCalledTimes(1);
        })
    })
    describe('findAll', () => {
        it('should return an user list', async () => {
            await service.findAll('1');
            expect(repository.find).toBeCalledTimes(1);
        })
    })
    describe('updatePayment', () => {
        it('should update payment with success', async () => {
            await service.updatePayment('1', 1);
            expect(repository.save).toBeCalledTimes(1);
        })
    })
    describe('updateArrive', () => {
        it('should update arrive with success', async () => {
            await service.updateArrive('1', 1);
            expect(repository.save).toBeCalledTimes(1);
        })
    })
    describe('remove', () => {
        it('should remove enrollment', async () => {
            await service.remove('1', 1);
            expect(repository.delete).toBeCalledTimes(1);
        })
    })

});

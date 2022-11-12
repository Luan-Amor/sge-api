import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const listUsers = [
  new User({id: '1', email: 'fulano@email.com', password: '123', gender: 'M', city: 'Goiania', state: 'GO'}),
  new User({id: '2', email: 'siclano@email.com', password: '123', gender: 'M', city: 'Goiania', state: 'GO'}),
  new User({id: '3', email: 'Beltrano@email.com', password: '123', gender: 'M', city: 'Goiania', state: 'GO'}),
  new User({id: '4', email: 'maria@email.com', password: '123', gender: 'F', city: 'Goiania', state: 'GO'}),
  new User({id: '5', email: 'jose@email.com', password: '123', gender: 'M', city: 'Goiania', state: 'GO'}),
  new User({id: '6', name: 'fulano', email: 'fu@email.com', password: '123', cpfCnpj: '12345678971', city: 'foo', state: 'foo', gender: 'M'}),
]


describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(listUsers),
            update: jest.fn(),
            merge: jest.fn(),
            softDelete: jest.fn(),
            findOneOrFail: jest.fn().mockResolvedValue(listUsers[0]), 
            create: jest.fn().mockResolvedValue(listUsers[5]),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('find all', () => {
    it('should return a list of UserDto', async () => {
      const result = await service.findAll();

      expect(result.length).toEqual(listUsers.length)
      expect(result[0]).toBeInstanceOf(UserDto)
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });
  describe('find One', () => {
    it('should return a user', async () => {
      const result = await service.findOne('1','1');

      expect(result.email).toEqual(listUsers[0].email)
      expect(result).toBeInstanceOf(UserDto)
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });
  });

  describe('Create', () => {
    it('should create an user', async () => {
      const dto: CreateUserDto = {name: 'fulano', email: 'fu@email.com', password: '123', cpfCnpj: '12345678971', city: 'foo', state: 'foo', gender: 'M'};

      await service.create(dto);

      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update', () => {
    it('should update an user', async () => {
      const dto: UpdateUserDto = {name: 'fulano', email: 'fu@email.com', password: '123', cpfCnpj: '12345678971', city: 'foo', state: 'foo', gender: 'M'};

      await service.update('1', dto);

      expect(userRepository.merge).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });
  describe('Remove', () => {
    it('should remove an user', async () => {
      await service.remove('1');
      expect(userRepository.softDelete).toHaveBeenCalledTimes(1);
    });
  });
});

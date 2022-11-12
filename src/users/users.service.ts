import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/role.enum';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;

    let entity: User = this.usersRepository.create(createUserDto);

    if (createUserDto.cpfCnpj.length > 11) {
      entity.role = Role.Organizer;
    }

    entity.password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    await this.usersRepository.save(entity);
  }

  async findAll() {
    return (await this.usersRepository.find()).map((user) => new UserDto(user));
  }

  async findOne(id: string, userId: string) {
    if (id !== userId) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return new UserDto(await this.findUserById(id));
  }

  async findByEmail(email: string) {
    try {
      return await this.usersRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      throw new NotFoundException('Usuário e/ou senha inválidos.');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(id);
    await this.usersRepository.merge(user, updateUserDto);
    await this.usersRepository.save(user);
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    await this.findUserById(id);
    await this.usersRepository.softDelete(id);
    return `This action removes a #${id} user`;
  }

  async findUserById(id) {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

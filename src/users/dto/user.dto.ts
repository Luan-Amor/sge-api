import { User } from '../entities/user.entity';

export class UserDto {
  name: string;

  email: string;

  cpfCnpj: string;

  gender: string;

  state: string;

  city: string;

  constructor(user?: User) {
    this.name = user?.name;
    this.email = user?.email;
    this.cpfCnpj = user?.cpfCnpj;
    this.gender = user?.gender;
    this.state = user?.state;
    this.city = user?.city;
  }
}

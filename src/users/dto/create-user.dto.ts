import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  cpfCnpj: string;

  @IsNotEmpty()
  password: string;

  gender: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;
}

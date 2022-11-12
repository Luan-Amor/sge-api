import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Role } from './role.enum';

const user = new User({
    id: '1', name: 'fulano',
    email: 'fulano@email.com',
    password: '$2b$10$3paJujsKMUzh/B0BIDxBE.ltqZ.IeffxgtS5Hu0jEpxmj8aSDY0AC',
    gender: 'M', role: Role.User,
    city: 'Goiania',
    state: 'GO'});

describe('AuthService', () => {
    let service: AuthService;
    let userService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AuthService, 
            {
                provide: JwtService,
                useValue: {
                    sign: jest.fn().mockReturnValue("12314564")
                }
            },
            {
            provide: UsersService,
            useValue: {
                findByEmail: jest.fn().mockReturnValue(user),
            },
            },
        ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
        expect(jwtService).toBeDefined();
    });

    describe('ValidateUser', () => {
        it('should validate user with success', async () => {
            const result = await service.validateUser("fulano@email.com", "123");
            expect(result.email).toEqual(user.email);
            expect(userService.findByEmail).toBeCalledTimes(1);
        })
        it('should return null', async () => {
            const result = await service.validateUser("fulano@email.com", "1234");
            expect(result).toBeNull();
        })
    })
    describe('Login', () => {
        it('should generate a token', async () => {
            const result = await service.login(user);
            expect(jwtService.sign).toBeCalledTimes(1);
        
        })
    })

});

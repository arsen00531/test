import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // нахождение всех пользователей
    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    // нахождение пользователя по dto
    async findOneBy(dto: UserDto) {
        if(!dto) {
            throw new BadRequestException('Wrong data')
        }
        return await this.userRepository.findOneBy(dto)
    }

    // нахождение пользователя по id
    async findOneById(id: number): Promise<User> {
        if(!id) {
            throw new BadRequestException('Wrong id')
        }
        return await this.userRepository.findOneBy({ id })
    }

    // нахождение пользователя по email
    async findOneByEmail(email: string) {
        if(!email) {
            throw new BadRequestException('Wrong email')
        }
        return await this.userRepository.findOneBy({ email })
    }

    // сохранение нового пользователя
    async save(user: UserDto) {
        return await this.userRepository.save(user)
    }
}

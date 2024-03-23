import { Injectable } from '@nestjs/common';
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

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findOneBy(dto: UserDto) {
        return await this.userRepository.findOneBy(dto)
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id })
    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }

    async save(user: UserDto) {
        return await this.userRepository.save(user)
    }
}

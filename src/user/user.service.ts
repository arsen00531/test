import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Article } from 'src/article/entities/article.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        userRepository: Repository<User>,
    ) {}
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        private readonly userService: UserService
    ) {}

    async create(articleDto: ArticleDto) {
        const user = await this.userService.findOneByEmail(articleDto.email)
        if(!user) {
            return new BadRequestException("Wrong email")
        }
        return await this.articleRepository.save({
            name: articleDto.name,
            description: articleDto.description,
            author: user
        })
    }

    async findAll() {
        return await this.articleRepository.find()
    }

    async findOne(id: number) {
        return await this.articleRepository.findOneBy({ id })
    }

    async update(id: number, articleDto: ArticleDto) {
        const article = await this.findOne(id)
        if(!article) {
            return new BadRequestException("Wrong article")
        }

        Object.assign(article, articleDto)

        return await this.articleRepository.save(article)
    }

    async delete(id: number) {
        const article = await this.findOne(id)
        if(!article) {
            return new BadRequestException("Wrong article")
        }
        
        return await this.articleRepository.remove(article)
    }
}

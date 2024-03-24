import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Between, Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';
import { UserService } from 'src/user/user.service';
import { Query } from 'express-serve-static-core'
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        private readonly userService: UserService,
        private readonly redisService: RedisService
    ) {}

    // создание новой статьи
    async create(articleDto: ArticleDto) {
        const user = await this.userService.findOneByEmail(articleDto.email)
        if(!user) {
            throw new BadRequestException("Wrong email")
        }

        return await this.articleRepository.save({
            name: articleDto.name,
            description: articleDto.description,
            author: user
        })
    }

    // Нахождение всех статей с пагинацией и фильтром по дате и email автора
    async findAll(query: Query) {
        const page = Number(query.page) || 1
        const limit = Number(query.limit) || 10
        const millisecond = parseInt(String(query.millisecond))
        const authorEmail = query.author || undefined

        const articles = await this.articleRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                createdAt: millisecond ? Between(new Date(millisecond), new Date()) : Between(new Date(0), new Date()),
                author: {
                    email: authorEmail ? String(authorEmail) : null
                }
            }
        })

        return articles
    }

    // Нахождение статьи по id
    async findOne(id: number) {
        return await this.articleRepository.findOneBy({ id })
    }

    // изменение статьи по id
    async update(id: number, articleDto: ArticleDto) {
        const article = await this.findOne(id)
        if(!article) {
            throw new BadRequestException("Wrong article")
        }

        Object.assign(article, articleDto)

        await this.redisService.del('findAll')

        return await this.articleRepository.save(article)
    }

    // удаление статьи
    async delete(id: number) {
        const article = await this.findOne(id)
        if(!article) {
            throw new BadRequestException("Wrong article")
        }
        await this.redisService.del('findAll')
        
        return await this.articleRepository.remove(article)
    }
}

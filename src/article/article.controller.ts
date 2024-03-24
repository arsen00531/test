import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { ArticleService } from './article.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';

@UseGuards(JwtGuard)
@Controller('article')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService
    ) {}

    @Post()
    create(@Body() articleDto: ArticleDto) {
        return this.articleService.create(articleDto)
    }

    @Get('findAll')
    findAll(@Query() query: ExpressQuery) {
        return this.articleService.findAll(query)
    }

    @Get('findOne')
    findOne(@Query('id') id: number) {
        return this.articleService.findOne(id)
    }

    @Put()
    update(@Query('id') id: number, @Body() articleDto: ArticleDto) {
        return this.articleService.update(id, articleDto)
    }

    @Delete()
    delete(@Query('id') id: number) {
        return this.articleService.delete(id)
    }
}

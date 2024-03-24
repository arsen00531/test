import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { ArticleService } from './article.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Article } from './entities/article.entity';

@UseGuards(JwtGuard)
@Controller('article')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService
    ) {}

    @ApiOperation({ summary: 'Create article' })
    @ApiResponse({ status: 201, type: Article })
    @ApiBody({ type: ArticleDto })
    @Post()
    create(@Body() articleDto: ArticleDto) {
        return this.articleService.create(articleDto)
    }

    @ApiOperation({ summary: 'Get all articles or articles with filters and pagination' })
    @ApiResponse({ status: 201, type: Article })
    @ApiQuery({ name: 'page', description: 'Page for pagination', example: '1', required: false })
    @ApiQuery({ name: 'limit', description: 'Limit on one page for pagination', example: '1', required: false })
    @ApiQuery({ name: 'author', description: 'Author email', example: 'example@example.example', required: false })
    @ApiQuery({ name: 'millisecond', description: 'Time in millisecond for search posts from that time', example: '11111111111111', required: false })
    @UseInterceptors(CacheInterceptor)
    @CacheKey('findAll')
    @Get('findAll')
    findAll(@Query() query: ExpressQuery) {
        return this.articleService.findAll(query)
    }

    @ApiOperation({ summary: 'Get article by id' })
    @ApiResponse({ status: 201, type: Article })
    @Get('findOne')
    findOne(@Query('id') id: number) {
        return this.articleService.findOne(id)
    }

    @ApiOperation({ summary: 'Ubdate info of article' })
    @ApiResponse({ status: 201, type: Article })
    @Put()
    update(@Query('id') id: number, @Body() articleDto: ArticleDto) {
        return this.articleService.update(id, articleDto)
    }

    @ApiOperation({ summary: 'Delete article' })
    @ApiResponse({ status: 201, type: Article })
    @Delete()
    delete(@Query('id') id: number) {
        return this.articleService.delete(id)
    }
}

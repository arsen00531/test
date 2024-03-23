import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { ArticleService } from './article.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('article')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService
    ) {}

    @Post()
    create(@Body() articleDto: ArticleDto) {
        return this.articleService.create(articleDto)
    }

    @UseGuards(JwtGuard)
    @Get()
    findAll() {
        return this.articleService.findAll()
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.articleService.findOne(id)
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() articleDto: ArticleDto) {
        return this.articleService.update(id, articleDto)
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.articleService.delete(id)
    }
}

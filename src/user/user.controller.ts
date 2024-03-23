import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/auth/dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    create(@Body() dto: UserDto) {
        return this.userService.save(dto)
    }

    @UseGuards(JwtGuard)
    @Get()
    findAll() {
        return this.userService.findAll()
    }
}
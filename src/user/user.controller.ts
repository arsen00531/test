import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/auth/dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, type: User })
    @ApiBody({ type: UserDto })
    @Post()
    create(@Body() dto: UserDto) {
        return this.userService.save(dto)
    }

    @ApiOperation({ summary: 'Get all Users' })
    @ApiResponse({ status: 201, type: [User] })
    @UseGuards(JwtGuard)
    @Get()
    findAll() {
        return this.userService.findAll()
    }
}
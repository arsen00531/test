import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { UserDto } from './dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 201, type: String })
    @ApiBody({ type: UserDto })
    @UsePipes(new ValidationPipe())
    @Post('login')
    login(@Body() dto: UserDto) {
        return this.authService.login(dto)
    }

    @ApiOperation({ summary: 'Registration user' })
    @ApiResponse({ status: 201, type: User })
    @ApiBody({ type: UserDto })
    @UsePipes(new ValidationPipe())
    @Post('registration')
    registration(@Body() dto: UserDto) {
        return this.authService.registration(dto)
    }
}

import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @UseGuards(JwtGuard)
    @Get()
    test() {
        return 
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    login(@Body() dto: UserDto) {
        return this.authService.login(dto)
    }

    @UsePipes(new ValidationPipe())
    @Post('registration')
    registration(@Body() dto: UserDto) {
        return this.authService.registration(dto)
    }
}

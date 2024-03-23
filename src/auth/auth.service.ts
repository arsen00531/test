import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async registration(userDto: UserDto) {
        const candidate = await this.userService.findOneByEmail(userDto.email)

        if(candidate) {
            return new BadRequestException('User already exists')
        }

        const hashPassword = await hash(userDto.password, 7)

        return await this.userService.save({
            email: userDto.email,
            name: userDto.name,
            password: hashPassword
        })
    }

    async login(userDto: UserDto) {
        const user = await this.validateUser(userDto)

        return this.tokenService.generateJwtToken({
            id: user.id,
            email: user.email,
            name: user.name,
        })
    }

    private async validateUser(userDto: UserDto) {
        const user = await this.userService.findOneByEmail(userDto.email)
        const verifyPassword = await compare(userDto.password, user.password)
        
        if(user && verifyPassword) {
            return user
        }

        throw new UnauthorizedException({ message: "Email or password wrong" })
    }
}
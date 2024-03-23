import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async generateJwtToken(payload: any) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('SECRET_OR_KEY'),
            expiresIn: this.configService.get('EXPIRED_JWT')
        })
    }
}

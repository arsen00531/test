import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    UserModule,
    TokenModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy]
})
export class AuthModule {}

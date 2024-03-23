import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get('TYPEORM_URL'),
        entities: [User, Article],
        synchronize: true
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ArticleModule,
    AuthModule,
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

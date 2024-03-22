import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get('TYPEORM_URL')
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ArticleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

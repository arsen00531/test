import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ArticleDto {

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name: string
    
    @IsString()
    @MaxLength(500)
    description: string

    @IsString()
    @IsEmail()
    email: string
}
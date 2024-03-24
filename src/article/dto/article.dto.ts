import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ArticleDto {

    @ApiProperty({ example: 'book', description: 'The article name' })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name: string
    
    @ApiProperty({ example: 'example@example.example', description: 'The user email' })
    @IsString()
    @MaxLength(500)
    description: string

    @ApiProperty({ example: 'example@example.example', description: 'The user email' })
    @IsString()
    @IsEmail()
    email: string
}
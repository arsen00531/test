import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {

    @ApiProperty({ example: 'example@example.example', description: 'The user email' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: 'root', description: 'The user name' })
    @IsString()
    @MaxLength(20)
    @MinLength(3)
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '123451', description: 'The user password' })
    @IsString()
    @MaxLength(15)
    @MinLength(4)
    @IsNotEmpty()
    password: string
}
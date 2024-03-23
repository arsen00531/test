import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MaxLength(20)
    @MinLength(3)
    @IsNotEmpty()
    name: string

    @IsString()
    @MaxLength(15)
    @MinLength(4)
    @IsNotEmpty()
    password: string
}
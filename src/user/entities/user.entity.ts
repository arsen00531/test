import { ApiProperty } from "@nestjs/swagger";
import { Article } from "src/article/entities/article.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @ApiProperty({ example: 1, description: 'The user id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'example@example.example', description: 'The user email' })
    @Column()
    email: string;

    @ApiProperty({ example: 'root', description: 'The user name' })
    @Column()
    name: string;

    @ApiProperty({ example: '123451', description: 'The user password' })
    @Column()
    password: string;

    @ApiProperty({
        type: () => [Article],
        example: 'Array of articles',  
        description: 'The user articles' 
    })
    @OneToMany(() => Article, (article) => article.author)
    articles: Article[]
}
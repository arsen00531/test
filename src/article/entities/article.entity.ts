import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('articles')
export class Article {

    @ApiProperty({ example: 1, description: 'The article id' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'book', description: 'The article name' })
    @Column()
    name: string

    @ApiProperty({ example: 'something', description: 'The article description' })
    @Column()
    description: string

    @ApiProperty({ example: '2024-03-24 12:35:06.529778', description: 'The article create date' })
    @CreateDateColumn()
    createdAt: Date

    @ApiProperty({ example: '2024-03-24 12:35:06.529778', description: 'The article updated date' })
    @UpdateDateColumn()
    updated_at: Date;

    @ApiProperty({
        type: () => User,
        example: 'User properties', 
        description: 'The article create date' 
    })
    @ManyToOne(() => User, (user) => user.articles)
    author: User
}
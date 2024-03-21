import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm"

export class AppDataSource {
    dataSource: DataSource;
    constructor(
        configService: ConfigService
    ) {
        this.dataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 54321,
            username: "root",
            password: "admin",
            database: "test",
            entities: ['dist/**/entities/*.entity.js'],
            migrations: ['migrations/*.ts'],
            migrationsTableName: "custom_migration_table",
        });
    }

    getDataSource(): DataSource {
        return this.dataSource
    }
}

export default new DataSource ({
    type: "postgres",
    host: "localhost",
    port: 54321,
    username: "root",
    password: "admin",
    database: "test",
    entities: ['dist/**/entities/*.entity.js'],
    migrations: ['migrations/*.ts'],
    migrationsTableName: "custom_migration_table",
})
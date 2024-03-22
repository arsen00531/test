import { config } from "dotenv"
import { DataSource } from "typeorm"

config()

export default new DataSource({
    type: "postgres",
    url: process.env.TYPEORM_URL,
    entities: [process.env.ENTITIES],
    migrations: [process.env.MIGRATIONS],
    migrationsTableName: "migration_table",
})
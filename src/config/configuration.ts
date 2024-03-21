export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        typeOrmURL: process.env.TYPEORM_URL ||'postgres://root:admin@localhost:5432/test_db'
    }
})
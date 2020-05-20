module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
        host: process.env.DEV_DB_HOSTNAME,
        dialect: 'mysql',
        define: {
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
        },
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql',
        define: {
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
        },
    }
};
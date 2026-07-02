const config = {
    app: {
        name: process.env.APP_NAME,
        env: process.env.APP_ENV || 'development',
        port: process.env.APP_PORT || 3000,
        url: process.env.APP_URL || 'http://localhost:3000',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    cors: {
        origins: process.env.CORS_ORIGINS.split(',') || ['http://localhost:5173'],
    },
    database: {
        firebase: {
            url: process.env.APP_URL_FIREBASE,
        },
    },
    thirdParty: {
        openai: {
            key: process.env.OPENAI_API_KEY,
        },
        geminiai: {
            key: process.env.GEMINI_API_KEY
        }
    }
}

const requiredConfigs = [
    { key: 'app.name', value: config.app.name },
    { key: 'app.port', value: config.app.port },
    { key: 'database.firebase.url', value: config.database.firebase.url },
    { key: 'jwt.secret', value: config.jwt.secret },
    { key: 'cors.origins', value: config.cors.origins },
]

requiredConfigs.forEach(({ key, value }) => {
    if (!value) {
        throw new Error(`Config "${key}" is required but not set in .env!`)
    }
})

export default config;




const corsOptions = {
    origin: process.env.CORS_ORIGINS.split(','),
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

export default corsOptions
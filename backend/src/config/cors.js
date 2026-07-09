import config from "./app.js";

const corsOptions = {
    origin: config.cors.origins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

export default corsOptions
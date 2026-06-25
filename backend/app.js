import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './src/routes/route.js';
import corsOptions from './src/config/cors.js';
import errorMiddleware from './src/middlewares/error.middleware.js';
import rateLimit from 'express-rate-limit'
import rateLimitConfig from './src/config/ratelimit.js';
const port = process.env.APP_PORT;
const app = express();
const limiter = rateLimit(rateLimitConfig);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get('/', (req, res) => {
    res.send(`${process.env.APP_NAME} is running on ${process.env.APP_URL}`);
});


app.use('/api/v1', routes);
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} is running on ${process.env.APP_URL}`);
});
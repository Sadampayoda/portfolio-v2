import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import routes from './src/routes/route.js';
import corsOptions from './src/config/cors.js';
import errorMiddleware from './src/middlewares/error.middleware.js';
import rateLimit from 'express-rate-limit'
import rateLimitConfig from './src/config/ratelimit.js';
import config from './src/config/app.js';
import sanitizeMiddleware from './src/middlewares/sanitize.middleware.js';

const port = config.app.port;
const app = express();
const limiter = rateLimit(rateLimitConfig);

app.use(cors(corsOptions)); // Atur CORS
app.use(express.json()); // Body JSON
app.use(express.urlencoded({ extended: true })); // Body URL-encoded
app.use(limiter); // Batasi jumlah request
app.use(morgan('dev')); // Log HTTP Request
app.use(helmet()); // Mengamankan header HTTP
app.use(sanitizeMiddleware); // Bersihkan XSS

app.get('/', (req, res) => {
    res.send(`${config.app.name} is running on ${config.app.url}`);
});


app.use('/api/v1', routes); // API Routes
app.use(errorMiddleware); // Error Handler

app.listen(port, () => {
    console.log(`${config.app.name} is running on ${config.app.url}`);
});
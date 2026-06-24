import 'dotenv/config';
import express from 'express';
import routes from './src/routes/route.js';
const port = process.env.APP_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`${process.env.APP_NAME} is running on ${process.env.APP_URL}`);
});

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} is running on ${process.env.APP_URL}`);
});
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import appRoutes from './routes';

// Use dotenv package
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

// Middlewares
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/v1', appRoutes);

// Listen for connection requests
app.listen(port, (error) => {
  error ? console.log(error): console.log(`App started on ${port}`);
});

export default app;
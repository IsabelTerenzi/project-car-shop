import express from 'express';
import carRouter from './Routers/carRouter';
import motoRouter from './Routers/motoRouter';

const app = express();

app.use(express.json());
app.use('/cars', carRouter);
app.use('/motorcycles', motoRouter);

export default app;

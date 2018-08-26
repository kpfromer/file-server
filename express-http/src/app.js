import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Routers
import api from './api';
import react from './react';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors())

app.use('/api', api);
app.use(react);

app.listen(port, () => console.log(`Listening on port: ${port}`))
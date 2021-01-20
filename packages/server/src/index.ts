'use strict';

import 'dotenv/config';
import cors from 'cors';
import express, { json } from 'express';

import customers from '../customers.json';

const app = express();
app.use(json());
app.use(cors());

app.get('/', (request, response) => {
    return response.json({ message: customers.filter((c) => c.id < 500) });
});

app.listen(3000, () => {
    console.log('🚀 Server started on http://localhost:3000');
});

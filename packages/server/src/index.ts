'use strict';

import 'dotenv/config';
import cors from 'cors';
import express, { json } from 'express';
import { initDataSource } from './init-data-source';

import router from './routes';
import { errorHandler } from './error-handler';

initDataSource.execute();

// express initial setup
const app = express();
app.use(json());
app.use(cors());

// setup routes
app.use(router);

// setup error handler
app.use(errorHandler);

// start app
app.listen(3000, () => {
    console.log('🚀 Server started on http://localhost:3000');
});

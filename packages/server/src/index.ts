'use strict';

import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';

import { setupGraphQL } from './setup/graphql.setup';
import { initialSetup } from './setup/init.setup';
import { setupServer } from './setup/server.setup';

async function bootstrap() {
    // initial setup
    await initialSetup();

    // express initial setup
    const app = express();

    setupServer(app);
    await setupGraphQL(app);

    // start app
    app.listen(3001, () => {
        console.log('🚀 Server started on http://localhost:3001');
    });
}

bootstrap();

'use strict';

import 'dotenv/config';

import express from 'express';
import { initDataSource } from './init-data-source';
import { setupGraphQL } from './setup/graphql.setup';
import { setupServer } from './setup/server.setup';

async function bootstrap() {
    // initial setup
    await initDataSource.execute();

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

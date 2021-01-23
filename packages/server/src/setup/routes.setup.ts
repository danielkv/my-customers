import { Router, Express } from 'express';
import { customerController } from '../customer/customer.controller';
import { cityController } from '../cities/city.controller';

/**
 * Create all routes for REST API
 */
export function setupRoutes() {
    // define the router
    const router = Router();

    // customer routes
    router.get('/customer/:customerId', (req, res, next) => customerController.findOne(req, res, next));
    router.get('/customers', (req, res, next) => customerController.findMany(req, res, next));

    // city routes
    router.get('/city', (req, res, next) => cityController.findOne(req, res, next));
    router.get('/cities', (req, res, next) => cityController.findMany(req, res, next));

    return router;
}

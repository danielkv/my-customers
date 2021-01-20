import { Router } from 'express';
import { customerController } from './customer/customer.controller';

// define the router
const router = Router();

// customer routes
router.get('/customer/:customerId', (req, res, next) => customerController.findOne(req, res, next));
router.get('/customers', customerController.findMany);

export default router;

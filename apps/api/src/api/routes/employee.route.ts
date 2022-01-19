import express from 'express';
import ROLES_LIST from 'constants/roles_list';
import acountLimiter from 'helpers/rateLimiter.middleware';
import { validation, validate } from '../validations/employee.validation';
import {
  createController,
  findController,
  findOneController,
  countController,
  updateController,
  removeController,
} from '../controllers/employee.controller';
import isAuthorized from '../middlewares/isAuthorized';

const router = express.Router();

router
  .route('/')
  .post(
    acountLimiter,
    validation(),
    validate,
    isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
    createController
  )
  .get(findController);
router
  .route('/:id')
  .get(findOneController)
  .put(
    validation(),
    validate,
    isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
    updateController
  )
  .delete(isAuthorized(ROLES_LIST.Administrator), removeController);
router.route('/count').get(countController);

export default router;

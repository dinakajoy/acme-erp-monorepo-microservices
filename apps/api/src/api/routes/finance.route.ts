import express from 'express';
import ROLES_LIST from 'constants/roles_list';
import { validation, validate } from '../validations/finance.validation';
import {
  createController,
  findController,
  findOneController,
  countController,
  updateController,
  removeController,
} from '../controllers/finance.controller';
import isAuthorized from '../middlewares/isAuthorized';

const router = express.Router();

router
  .route('/')
  .post(
    validation(),
    validate,
    isAuthorized(ROLES_LIST.Account, ROLES_LIST.Administrator),
    createController
  )
  .get(findController);
router
  .route('/:id')
  .get(findOneController)
  .put(
    validation(),
    validate,
    isAuthorized(ROLES_LIST.Account, ROLES_LIST.Administrator),
    updateController
  )
  .delete(isAuthorized(ROLES_LIST.Administrator), removeController);
router.route('/count').get(countController);

export default router;

import express from 'express';
import isAuthenticated from 'helpers/isAuthenticated.middleware';
import acountLimiter from 'helpers/rateLimiter.middleware';
import {
  loginResetValidation,
  forgetPasswordValidation,
  validate,
} from '../validations/auth.validation';
import {
  loginController,
  forgotPasswordController,
  resetPasswordController,
  refreshTokenController,
  logoutController,
} from '../controllers/auth.controller';

const router = express.Router();

router.post(
  '/login',
  acountLimiter,
  loginResetValidation(),
  validate,
  loginController
);
router.post(
  '/forgot-password',
  acountLimiter,
  forgetPasswordValidation(),
  validate,
  forgotPasswordController
);
router.put(
  '/reset-password',
  loginResetValidation(),
  validate,
  isAuthenticated,
  resetPasswordController
);

router.get('/refresh-token', refreshTokenController);
router.get('/logout', logoutController);

export default router;

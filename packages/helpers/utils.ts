/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv-safe';
import logger from './logger';
import { CustomException } from 'constants/errors';
import { ICreateToken, IVerifyToken } from '../interfaces/token';

dotenv.config();

const accessTokenSecret: string =
  process.env.ACCESS_TOKEN_SECRET || 'J6sqQuxISZfVfS+7/bWTtX';

const refreshTokenSecret: string =
  process.env.REFRESH_TOKEN_SECRET || 'J6sqQuxISZfVfS+7/bWTtX';

const saltGen: number = +`${process.env.SALT_GEN}` || 5;

export const signAccessToken = (
  payload: ICreateToken,
  next: NextFunction
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { payload: payload.employeeInfo },
      payload.isRefreshToken ? refreshTokenSecret : accessTokenSecret,
      { expiresIn: payload.isRefreshToken ? '3d' : '30m' },
      (err, token) => {
        if (err) {
          logger.error(err.message);
          next(new (CustomException as any)(500, 'Unsuccessful operation'));
        }
        resolve(token);
      }
    );
  });
};

export const verifyAccessToken = (
  tokenData: IVerifyToken,
  next: NextFunction
): Promise<JwtPayload | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      tokenData.token,
      tokenData.isRefreshToken ? refreshTokenSecret : accessTokenSecret,
      (err: any, payload) => {
        if (err) {
          const message =
            err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          logger.error(message);
          next(new (CustomException as any)(500, message));
        }
        resolve(payload);
      }
    );
  });
};

export const hashPassword = (
  password: string,
  next: NextFunction
): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltGen, (err, salt) => {
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          logger.error(error.message);
          next(new (CustomException as any)(500, 'Unsuccessful operation'));
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (
  password: string,
  hash: string,
  next: NextFunction
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, res) {
      if (err) {
        logger.error(err.message);
        next(new (CustomException as any)(500, 'Unsuccessful operation'));
      }
      resolve(res);
    });
  });
};

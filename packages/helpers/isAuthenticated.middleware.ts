import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import logger from './logger';
import { verifyAccessToken } from './utils';
import { isUser } from './user.service';
import InvalidException from 'constants';
import NotFoundException from 'constants';
import CustomException from 'constants';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  if (!token) {
    next(new (NotFoundException as any)());
  } else {
    try {
      const decodedToken: JwtPayload | undefined = await verifyAccessToken(
        { token, isRefreshToken: false },
        next
      );
      if (decodedToken) {
        const userEmail = decodedToken.payload.email;
        const result = await isUser(userEmail, next);
        if (!result) {
          next(new (InvalidException as any)());
        }
        req.body.email = userEmail;
        next();
      } else {
        next(new (InvalidException as any)());
      }
    } catch (error: any) {
      logger.error(error.message);
      next(new (CustomException as any)(403, 'Operation unsuccessful'));
    }
  }
};

export default isAuthenticated;

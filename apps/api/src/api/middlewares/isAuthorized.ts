/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyAccessToken } from 'helpers/utils';
import { UnauthorizedException } from 'constants/errors';

const isAuthorized = (...allowedRoles) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.session?.isAuthenticated;
    if (!token) {
      return next(new (UnauthorizedException as any)());
    }
    const decodedToken: JwtPayload | undefined = await verifyAccessToken(
      { token, isRefreshToken: true },
      next
    );
    const { role } = decodedToken.payload;
    const rolesArray = [...allowedRoles];
    const result = rolesArray.includes(role);
    if (!result) {
      return next(new (UnauthorizedException as any)());
    }
    next();
  };
};

export default isAuthorized;

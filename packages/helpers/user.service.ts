import { MongoClient } from 'mongodb';
import dotenv from 'dotenv-safe';
import { NextFunction } from 'express';
import logger from './logger';
import CustomException from 'constants';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '../.env'
      : `../.env.${process.env.NODE_ENV}`,
});

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

export const isUser = async (email: string, next: NextFunction) => {
  try {
    await client.connect();
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection('User');
    const user = await collection.findOne({
      email,
    });
    await client.close();
    return user !== null;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export default isUser;

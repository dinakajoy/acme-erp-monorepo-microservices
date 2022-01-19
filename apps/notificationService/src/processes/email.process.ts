/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Job } from 'bull';
import nodemailer from 'nodemailer';
import { NextFunction } from 'express';
import logger from 'helpers/logger';
// import { IMailData } from 'interfaces/maildata';
import { CustomException } from 'constants/errors';

const emailProcess = async (job: Job, next: NextFunction) => {
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
    secure: true,
  });

  return new Promise((resolve, reject) => {
    transporter.sendMail(job.data, (err, info) => {
      if (err) {
        logger.error(err.message);
        return next(
          new (CustomException as any)(500, 'Operation unsuccessful')
        );
      }
      return resolve(true);
    });
  });
};

export default emailProcess;

import Bull from 'bull';
// import { setQueues, BullAdapter } from 'bull-board';
import emailProcess from '../processes/email.process';

const emailQueue = new Bull('email');

// setQueues([new BullAdapter(emailQueue)]);

emailQueue.process('sendMail', emailProcess);

const sendNewEmail = (data: any) => {
  emailQueue.add(data, {
    attempts: 5,
  });
};

export default sendNewEmail;

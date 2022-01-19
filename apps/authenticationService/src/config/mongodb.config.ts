import { MongoClient } from 'mongodb';
import dotenv from 'dotenv-safe';
import { connect } from 'http2';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '../.env'
      : `../.env.${process.env.NODE_ENV}`,
});

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    console.log('Successfully connected to DB!');
  })
  .catch((error) => {
    console.log('Unable to connect to DB!');
    console.error(error);
  });

export default connect;

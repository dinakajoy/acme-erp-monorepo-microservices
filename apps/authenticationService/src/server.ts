import dotenv from 'dotenv-safe';
import logger from 'helpers/logger';
import app from './app';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '../.env'
      : `../.env.${process.env.NODE_ENV}`,
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => logger.info(`🚀 @ http://localhost:${PORT}`));

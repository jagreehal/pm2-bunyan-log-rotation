import dotenv from 'dotenv';
dotenv.config();
import { createApp } from './app';
import LoggerFunction from './utils/logger';
const LoggerClass = LoggerFunction();

process.on('SIGINT', function () {
  LoggerClass.log.info('>>> SIGINT');
  process.exit();
});

process.on('uncaughtException', async (err, origin) => {
  LoggerClass.log.error(err, '>>> uncaughtException');
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  LoggerClass.log.error('>>> unhandledRejection', {
    reason,
  });
  process.exit(1);
});



const { PORT, HOST } = (process.env);

if (!PORT || !HOST) {
  throw new Error('PORT and HOST must be set');
}

const IS_PM2 = !!process.env.pm_id;
LoggerClass.log.info(`IS PM2=${IS_PM2.toString()}`);

function startApp(app) {
  return new Promise((resolve, reject) => {
    app.listen(PORT, HOST).once('listening', resolve).once('error', reject);
  });
}

async function start() {
  const app = await createApp();
  await startApp(app);
}

start()
  .then(() => {
    LoggerClass.log.info(`app is running at http://${HOST}:${PORT}`);
  })
  .catch((err) => {
    LoggerClass.log.error(err, 'could not start the application');
  });

import bunyan from 'bunyan';
import fs from 'fs';
import path from 'path';

let LOGGER_INSTANCE;

const consoleStream = {
  level: 'info',
  stream: process.stdout,
};

export default function (logfilename = 'log/server.log') {
  const dir = path.dirname(logfilename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const fullPath = path.join(process.cwd(), logfilename);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, '');
  }

  if (!LOGGER_INSTANCE) {
    LOGGER_INSTANCE = bunyan.createLogger({
      name: 'api',
      serializers: bunyan.stdSerializers,
      streams: [
        consoleStream,
        {
          level: process.env.LOGGER_LEVEL || 'info',
          type: 'rotating-file',
          path: logfilename,
          period: '60000ms',
          count: 10,
        },
      ],
    });
  }

  return { log: LOGGER_INSTANCE };
}

import fs from 'fs';
import fsPromises from 'fs/promises';
import express, { Express } from 'express';
import path from 'path';
import LoggerFunction from './utils/logger';
const LoggerClass = LoggerFunction();

const id = process.pid;

const leakyArray: string[] = [];

export const createApp = async (): Promise<Express> => {
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/api', async (req, res) => {
    LoggerClass.log.info('GET /api');
    res.json({ id });
  });

  app.get('/api/boom/async', async (req, res) => {
    await fsPromises.readFile('non-existent-file');
    return res.status(200);
  });

  app.get('/api/boom/sync', (req, res) => {
    fs.readFileSync('non-existent-file');
    return res.status(200);
  });

  app.get('/api/exit', (req, res) => {
    process.exit(1);
  });

  app.get('/api/memory-leak', (req, res) => {
    LoggerClass.log.info('GET /api/memory-leak', { length: leakyArray.length });
    leakyArray.push(new Array(1000000).join('*'));
    return res.json({ length: leakyArray.length });
  });

  return app;
};

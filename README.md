# PM2 bunyan log rotation example

This repository contains example of a Node.js app logging using [PM2](https://pm2.keymetrics.io/) and [bunyan](https://github.com/trentm/node-bunyan) rotating files every minute.

## Prerequisites

You'll need Node and Docker, to run via docker-compose.

## Getting Started

Install dependencies using npm, yarm or pnpm then run the application.

```bash
npm build
```

## Check env

Configure the PORT and HOST in the [.env](.env) file, which is currently set to

```env
PORT=5000
HOST=0.0.0.0
```

## Running

Start pm2

```bash
docker-compose up
```

## Running PM2 commands

```bash
docker exec -it pm2-bunyan-log-rotation-pm2_api-1 sh
```

now you can run pm2 commands like the one below

```bash
pm2 list
```

## Logs

PM2 logs are stored in the `~/.pm2/logs` directory.

Bunyan logs are stored in the `/usr/log` directory.

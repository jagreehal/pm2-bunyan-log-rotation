/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
dotenv.config();

const autocannon = require('autocannon');

async function run() {
  const result = await autocannon({
    // url: `http://${process.env.HOST}:${process.env.PORT}/api/memory-leak`,
    url: `http://${process.env.HOST}:${process.env.PORT}/api/`,
    connections: 100,
    pipelining: 1,
    duration: 10000,
  });
  console.log(result);
}

run()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.error(err);
  });

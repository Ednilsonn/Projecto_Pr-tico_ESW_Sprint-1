const { Client } = require('pg');

(async () => {
  const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'ronaldinhoE10',
    port: 5432,
  });

  await client.connect();

  const res = await client.query(`
    SELECT pg_terminate_backend(pg_stat_activity.pid)
    FROM pg_stat_activity
    WHERE pg_stat_activity.datname = 'vendas'
      AND pid <> pg_backend_pid();
  `);

  console.log(res);

  await client.end();
})();

import { Knex } from 'knex';
import { blah } from 'src/config/config';

// export const KNEX_CONFIG: Knex.Config = {
//   client: 'pg',
//   connection: {
//     host: process.env.DATABASE_HOST,
//     port: 5432,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//   },
//   pool: { min: 1, max: 10 },
// };

export const KNEX_CONFIG: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: 'postgres',
    password: '',
    database: process.env.DATABASE_NAME,
  },
  pool: { min: 1, max: 10 },
};

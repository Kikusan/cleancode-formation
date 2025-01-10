import knex, { Knex } from 'knex';
import * as BlueBirdPromise from 'bluebird';
import knexConfig from '../src/uber-light/adapters/secondary/gateways/database-config/knexfile';

const sqlTables = ['bookings', 'travellers'];
export const resetDB = (sqlConnection: Knex) => {
  return sqlConnection.migrate.latest().then(() => {
    return BlueBirdPromise.each(sqlTables, function (table) {
      return sqlConnection.raw('truncate table ' + table + ' cascade');
    });
  });
};
export const sqlConnection = knex(knexConfig.test);

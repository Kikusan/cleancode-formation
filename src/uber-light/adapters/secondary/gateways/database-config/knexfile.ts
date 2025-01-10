const knexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'wealcome',
      password: '',
      database: 'uberlightdb',
    },
    searchPath: ['dev'],
    pool: {
      min: 2,
      max: 20,
      afterCreate: function (connection, callback) {
        connection.query('SET timezone = "Europe/Paris";', function (err) {
          callback(err, connection);
        });
      },
    },
    migrations: {
      tableName: 'knex_migrations',
      schemaName: 'dev',
    },
    seeds: {
      directory: __dirname + '/seeds/dev',
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'uberlightdb',
    },
    searchPath: ['test'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      schemaName: 'test',
      directory: __dirname + '/migrations/',
    },
  },
};

export default knexConfig;

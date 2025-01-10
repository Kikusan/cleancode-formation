exports.seed = function (knex) {
  return knex('travellers').insert([
    {
      id: 'f14269fa-8e06-4261-b1a9-a2a8953a06d1',
      birth_date: new Date(2009, 3, 4),
    },
  ]);
};

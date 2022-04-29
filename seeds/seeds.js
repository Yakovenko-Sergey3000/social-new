/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require("bcrypt");
const soul = 6;

exports.seed = async function(knex) {
  await knex('users').insert([
    {email: 'superadmin@fake.com', password: await bcrypt.hash("123qwe", soul), name: "superadmin" },
    {email: 'admin@fake.com', password: await bcrypt.hash("123qwe", soul), name: "admin" },
    {email: 'user1@fake.com', password: await bcrypt.hash("123qwe", soul), name: "user" },
    {email: 'user2@fake.com', password: await bcrypt.hash("123qwe", soul), name: "user" },
  ]);
  await knex('roles').insert([
    {role_name: "superadmin", role_id: 1 },
    {role_name: "admin", role_id: 2},
    {role_name: "user", role_id: 3},
  ]);
  await knex('user_roles').insert([
    {user_id: 1, role_id: 1},
    {user_id: 2, role_id: 2},
    {user_id: 3, role_id: 3},
    {user_id: 4, role_id: 3},
  ]);
};

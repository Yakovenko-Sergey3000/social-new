/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = (knex) => {
  return knex.schema
    .createTable("users", (t) => {
      t.increments("id").primary()
      t.string("name")
      t.string("email")
        .unique()
        .notNullable()
      t.string("password")
        .notNullable()
    })
    .createTable("roles", (t) => {
      t.string("role_name")
        .unique()
      t.integer("role_id")
        .primary()
    })
    .createTable("user_roles", (t) => {
      t.integer("user_id")
      t.integer("role_id")

      t.foreign("user_id").references("users.id")
      t.foreign("role_id").references("roles.role_id")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .raw('DROP TABLE users CASCADE')
    .raw('DROP TABLE roles CASCADE')
    .dropTable("user_roles")
};

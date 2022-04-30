/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("friendship", (t) => {
    t.integer("user_one")
      .notNullable()
    t.integer("user_two")
      .notNullable()
    t.integer("status")
      .defaultTo(0)
    t.timestamp("deleteAt")

    t.foreign("user_one").references("users.id")
    t.foreign("user_two").references("users.id")
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("friendship");
};

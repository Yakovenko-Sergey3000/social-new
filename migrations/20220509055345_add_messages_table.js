/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("messages", (t) => {
      t.increments("id")
      t.integer("room_id")
      t.text("body")
      t.integer("status")
      t.timestamp("createAt")
      t.timestamp("updateAt")
      t.timestamp("deleteAt")
    })
    .createTable("room_messages", (t) => {
      t.integer("id")
      t.integer("author_id")
      t.integer("recipient_user")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

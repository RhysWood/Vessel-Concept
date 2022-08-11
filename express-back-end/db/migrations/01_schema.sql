DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS orders_items CASCADE;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(250),
  "last_name" varchar(250),
  "email_address" varchar(250),
  "password" varchar(250),
  "phone_number" bigint,
  "admin" boolean
);

CREATE TABLE "businesses" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "address" varchar(300),
  "main_contact" int,
  "CRS" varchar(100)
);

CREATE TABLE "inventory" (
  "id" SERIAL PRIMARY KEY,
  "business" int,
  "brand" varchar(100),
  "can_size" varchar(300),
  "on_hand" int,
  "PSL" boolean,
  "price" decimal,
);

CREATE TABLE "items" (
  "id" SERIAL PRIMARY KEY,
  "inventory_id" int,
  "quantity" int,
  "total_price" decimal,
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "business_id" int,
  "submitted" boolean,
  "requested_date" datetime,
  "ship_date" datetime,
  "shipped" boolean
);

CREATE TABLE "orders_items" (
  "id" SERIAL PRIMARY KEY,
  "item_id" int,
  "order_id" int
);

ALTER TABLE "items" ADD FOREIGN KEY ("inventory_id") REFERENCES "inventory" ("id");

ALTER TABLE "businesses" ADD FOREIGN KEY ("main_contact") REFERENCES "users" ("id");

ALTER TABLE "inventory" ADD FOREIGN KEY ("business") REFERENCES "businesses" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("business_id") REFERENCES "businesses" ("id");

ALTER TABLE "orders_items" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

ALTER TABLE "orders_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

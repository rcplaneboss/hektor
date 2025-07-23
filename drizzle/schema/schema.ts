import {
  pgTable,
  uuid,
  text,
  numeric,
  integer,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  phone: text("phone"),
  image: text("image"),
  provider: varchar("provider", { length: 255 }),
  role: varchar("role", { length: 50 }).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// -----------------------------
// Products
// -----------------------------
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  sanityId: text("sanity_id").notNull(), // Link to Sanity document _id
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  stock: numeric("stock").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// -----------------------------
// Product Variants
// -----------------------------
export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  variantType: text("variant_type").notNull(), // e.g. 'size', 'color'
  value: text("value").notNull(), // e.g. 'Large', 'Red'
  price: numeric("price", { precision: 10, scale: 2 }), // Optional override
  stock: integer("stock").default(0),
});

// -----------------------------
// Cart Items
// -----------------------------
export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(), // Supabase Auth user ID
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  variantId: uuid("variant_id").references(() => productVariants.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// -----------------------------
// Orders
// -----------------------------
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(), // Supabase Auth user ID
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"), // 'pending', 'paid', etc.
  paymentMethod: text("payment_method"), // 'paystack', 'card', etc.
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// -----------------------------
// Order Items
// -----------------------------
export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  variantId: uuid("variant_id").references(() => productVariants.id),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(), // Price at time of order
});

// -----------------------------
// Newsletter Subscribers 
// -----------------------------
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

import { sql, AnyColumn } from "drizzle-orm";

export const incr = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`;
};

export const decr = (column: AnyColumn, value = 1) => {
  return sql`${column} - ${value}`;
};

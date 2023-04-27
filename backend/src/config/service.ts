import { Dialect } from "sequelize";

const dialects = [
  "mysql",
  "postgres",
  "sqlite",
  "mariadb",
  "mssql",
  "db2",
  "snowflake",
  "oracle",
] as const;

export function isDialect(value: string) {
  if (!dialects.includes(value as Dialect)) {
    throw "DIALECT does not exist. Check .env";
  }

  return value as Dialect;
}
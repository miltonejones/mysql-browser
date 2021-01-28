import { DbConnection } from "./db-connection";

export interface DbRequest {
  config: DbConnection;
  query: string;
  limit?: number;
  page?: number;
  size?: number;
}

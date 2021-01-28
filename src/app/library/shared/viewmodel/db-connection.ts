import { MysqlTable } from "../classes/mysql-table";
import { DbQuery } from "./db-query";

export interface DbConnection {
  HOSTNAME: string;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
  KEY?: string;
  PORT?:  number;
  Objects: MysqlTable[];
  Queries?: DbQuery[];
  Collated?: CollatedObject[]
}

export interface CollatedObject {
  label: string;
  children: MysqlTable[];
  action?: () => void;
}

export function collateConnection(connection: DbConnection): void {
  connection.Objects.map(ob => {
     ob.Path = `${connection.HOSTNAME}/${ob.Name}`;
     ob.Columns.map(col => {
      col.Path = `${connection.HOSTNAME}/${ob.Name}/${col.Name}`;
     })
  });
  connection.Collated = [
    {
      label: 'Tables',
      children: connection.Objects?.filter(ob => ob.isTable)
    },
    {
      label: 'Views',
      children: connection.Objects?.filter(ob => ob.isView)
    },
    {
      label: 'Stored Procedures',
      children: connection.Objects?.filter(ob => ob.isProc)
    }
  ];
}
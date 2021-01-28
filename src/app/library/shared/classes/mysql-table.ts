import { MysqlColumn } from "./mysql-column";

export class MysqlTable {
  SQL = '';
  Name = '';
  Type = '';
  Rows = 0;
  Columns: MysqlColumn[] = [];
  Path = '';
  constructor(row: any) {
    this.Name = row.TABLE_NAME;
    this.Type = row.TABLE_TYPE;
    this.Rows = row.TABLE_ROWS;
  }
  get Text(): string {
    const rex = /VIEW\s`[^`]+`\sAS\sSELECT([\s\S]+)/i.exec(this.SQL);
    if (rex) {
      const halves = this.SQL.split(/select/i); 
      const first = halves.shift();
      const rest = halves.join('SELECT')
      return first + '\n  SELECT\n  ' + 
      rest.split(',').join('\n  ,')
        .split(/from/i).join('FROM\n  ')
        .split(/join/i).join('JOIN\n    ');
    }
    return this.SQL;
  }
  get isTable(): boolean {
    return this.Type.indexOf('TABLE') > -1;
  }
  get isProc(): boolean {
    return this.Type.indexOf('PROCEDURE') > -1;
  }
  get isView(): boolean {
    return this.Type.indexOf('VIEW') > -1;
  }
  add(): MysqlColumn {
    const column = new MysqlColumn({
      COLUMN_NAME: 'NewColumn' + this.Columns.length,
      DATA_TYPE: 'varchar',
      COLUMN_TYPE: 'varchar(50)',
      IS_NULLABLE: 'YES'
    });
    this.Columns.push(column);
    return column;
  }
}
// this.Name = row.COLUMN_NAME;
// this.Type = row.DATA_TYPE;
// this.Extra = row.EXTRA;
// this.Key = row.COLUMN_KEY;
// this.AllowNull = row.IS_NULLABLE;
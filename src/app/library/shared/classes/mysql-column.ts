 

export interface MySqlConstraint {
  COLUMN_NAME: string;
  CONSTRAINT_CATALOG: string;
  CONSTRAINT_NAME: string;
  CONSTRAINT_SCHEMA: string;
  ORDINAL_POSITION: number;
  POSITION_IN_UNIQUE_CONSTRAINT: number;
  REFERENCED_COLUMN_NAME: string;
  REFERENCED_TABLE_NAME: string;
  REFERENCED_TABLE_SCHEMA: string;
  TABLE_CATALOG: string;
  TABLE_NAME: string;
  TABLE_SCHEMA: string;
}

export class MysqlColumn {
  Name = '';
  Type = '';
  Length = 0;
  Extra = '';
  Key = '';
  AllowNull = '';
  Constraints: MySqlConstraint[] = [];
  Constraint = ''
  Dirty = false;
  Path = '';
  constructor(row: any, con?: MySqlConstraint[]) {
    this.Name = row.COLUMN_NAME;
    this.Type = row.DATA_TYPE;
    this.Extra = row.EXTRA || '';
    this.Key = row.COLUMN_KEY || '';
    this.AllowNull = row.IS_NULLABLE;
    this.setLength(row.COLUMN_TYPE)
    if(con?.length) {
      this.Constraints = con.filter(c => c.COLUMN_NAME === this.Name);
      this.setConstraint();
    }
  }
  setConstraint(): void {
    const constraint = this.Constraints[0];
    if (constraint && constraint.REFERENCED_TABLE_NAME) {
      this.Constraint = `${constraint.REFERENCED_TABLE_NAME}.${constraint.REFERENCED_COLUMN_NAME}`;
    }
  }
  setLength(type: string): void {
    const regex = /\w+\((\d+)\)/.exec(type);
    if (regex) {
      this.Length = parseInt(regex[1]);
    }
  }
}

/**CHARACTER_MAXIMUM_LENGTH: null
CHARACTER_OCTET_LENGTH: null
CHARACTER_SET_NAME: null
COLLATION_NAME: null
COLUMN_COMMENT: ""
COLUMN_DEFAULT: null
: "PRI"
: "ID"
: "int(11)"
: "int"
DATETIME_PRECISION: null
: "auto_increment"
GENERATION_EXPRESSION: ""
: "NO"
NUMERIC_PRECISION: 10
NUMERIC_SCALE: 0
ORDINAL_POSITION: 1
PRIVILEGES: "select,insert,update,references"
TABLE_CATALOG: "def"
TABLE_NAME: "s3Music"
TABLE_SCHEMA: "db_audiopirate" */
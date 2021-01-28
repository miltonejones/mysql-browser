export interface DbResponse {
  label: string;
  response: DbResponseData;
  text: string;
  columns?: string[]
}

export interface DbResponseData {
  err: any;
  count: number;
  result: any[];
}


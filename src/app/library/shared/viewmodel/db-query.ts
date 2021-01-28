import { Observable } from "rxjs";
import { DbResponseData } from "./db-response";

export interface DbQuery {
  text: string;
  label: string;
  response?: DbResponseData;
  columns?: string[]
  page: number;
  size: number;
  next: () => Observable<any>;
}

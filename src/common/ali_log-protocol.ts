import { LogItem } from "./model/LogItem-model";

export const AliLogServer = Symbol("AliLogServer");

export interface AliLogServer {
  logList(params: { from: number; to: number }): Promise<{ body:any[]; headers: any; request_id: string }>;
}

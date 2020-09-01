import { AliLogServer } from "../common/ali_log-protocol";
import { Rpc } from "@malagu/rpc";
import { getSLS } from "./ali_sdk";
import { plainToClass } from "class-transformer";
import { LogItem } from "../common/model/LogItem-model";
import { Component, Value } from "@malagu/core";
@Rpc(AliLogServer)
export class AliLogServerImpl implements AliLogServer {
  @Value({ el: "malagu.aliyun", detached: true })
  aliConfig!: any;

  SLS = getSLS(this.aliConfig);

  logList(params: { from: number; to: number }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.SLS.getLogs(
        {
          projectName: "npp-pro",
          logStoreName: "npp-wx",
          from: Math.floor(params.from / 1000),
          to: Math.floor(params.to / 1000),
        },
        function (error: any, data: any) {
          resolve(error || data);
        },
      );
    });
  }
}

import * as React from "react";
import { Autorpc } from "@malagu/rpc/lib/common/annotation/detached";
import { WelcomeServer } from "../common/welcome-protocol";
import { AliLogServer } from "../common/ali_log-protocol";
import { View } from "@malagu/react";
import { LogItem } from "../common/model/LogItem-model";
import { plainToClass } from "class-transformer";

interface Prop {}
interface State {
  UserMap: { [k: string]: LogItem[] };
}
@View()
export class Main extends React.Component<Prop, State> {
  @Autorpc(WelcomeServer)
  protected welcomeServer!: WelcomeServer;

  @Autorpc(AliLogServer)
  protected AliLogServer!: AliLogServer;

  constructor(prop: Prop) {
    super(prop);
    this.state = { UserMap: {} };
  }

  async componentDidMount() {
    const logRes = await this.AliLogServer.logList({
      from: Date.now() - 24 * 60 * 60 * 1000,
      to: Date.now(),
    });
    const AllList = plainToClass(
      LogItem,
      Object.keys(logRes.body).map((k) => logRes.body[k]),
    );
    const UserMap = {} as { [k: string]: LogItem[] };
    for (const item of AllList) {
      if (!Array.isArray(UserMap[item.uuid])) {
        UserMap[item.uuid] = [];
      }
      const list = UserMap[item.uuid];
      list.push(item);
    }

    console.log("[AllList]", AllList);

    this.setState({
      UserMap,
    });
  }

  render() {
    return (
      <div>
        <h1>牛拼拼 用户行为可视化</h1>
        {Object.keys(this.state.UserMap).map((uuid, index) => {
          const el = this.state.UserMap[uuid];
          const e0 = el[0];
          return (
            <Rows data={el} key={index}>
              {e0.user.name ? e0.user.name : e0.uuid}
            </Rows>
          );
        })}
      </div>
    );
  }
}
interface RowsProp {
  data: LogItem[];
}
class Rows extends React.Component<RowsProp, {}> {
  render() {
    const data = this.props.data;
    const u = data[data.length - 1];
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "100px", flexShrink: 0 }}>{u.user.name ? u.user.name : "<匿名用户>"}</div>
        {data.map((el, index) => {
          return (
            <div key={index} style={{ flexShrink: 0 }}>
              {el.label.type}
              <div>{el.接收时间.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

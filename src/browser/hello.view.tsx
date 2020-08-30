import * as React from "react";
import { Autorpc } from "@malagu/rpc/lib/common/annotation/detached";
import { WelcomeServer } from "../common/welcome-protocol";
import { AliLogServer } from "../common/ali_log-protocol";
import { View } from "@malagu/react";
import { LogItem } from "../common/model/LogItem-model";

interface Prop {}
interface State {
  logList: LogItem[];
}
@View()
export class Hello extends React.Component<Prop, State> {
  @Autorpc(WelcomeServer)
  protected welcomeServer!: WelcomeServer;

  @Autorpc(AliLogServer)
  protected AliLogServer!: AliLogServer;

  constructor(prop: Prop) {
    super(prop);
    this.state = { logList: [] };
  }

  async componentDidMount() {
    const logRes = await this.AliLogServer.logList({
      from: Date.now() - 24 * 60 * 60 * 1000,
      to: Date.now(),
    });
    console.log("[    list]", logRes.body);

    this.setState({
      logList: logRes.body,
    });
  }

  render() {
    return (
      <div>
        <h1>牛拼拼 用户行为可视化</h1>
        {this.state.logList.map((el, index) => (
          <div key={index}>{JSON.stringify(el.user)}</div>
        ))}
      </div>
    );
  }
}

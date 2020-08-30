import { plainToClass } from "class-transformer";
import { Expose, Transform } from "class-transformer/decorators";
const toClassOnly = true;
export class Request {
  data: any;

  @Expose({ name: "obj" })
  请求参数: { url: string; method: string };
  res: any;
}

@Expose()
export class LogItem {
  @Expose({ name: "__source__" })
  来源ip: "";

  @Expose({ name: "__tag__:__client_ip__" })
  客户ip: "175.24.69.228";

  @Expose({ name: "__tag__:__receive_time__" })
  接收时间: "1598584501";
  __time__: "1598584501";
//   __topic__: "";

  @Transform((v) => (v ? JSON.parse(v) : {}), { toClassOnly })
  content: "";

  @Expose({ name: "err" })
  //   @Transform((v) => (v ? JSON.parse(v) : {}), { toClassOnly })
  错误内容: "{}";

  @Expose({ name: "historicalRequest" })
  @Transform((v) => (v ? plainToClass(Request, JSON.parse(v)) : {}), { toClassOnly })
  历史请求: Request[];

  @Transform((v) => (v ? JSON.parse(v) : {}), { toClassOnly })
  label: '{"type":"打开页面","info":""}';

  /** 当前页面地址 */
  route: "pages/home/login/login";

  @Transform((v) => (v ? JSON.parse(v) : {}), { toClassOnly })
  user: "{}";
  uuid: "1598584496467-72a7b6748c2e";
}

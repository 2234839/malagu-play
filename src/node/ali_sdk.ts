
const ALY = require("aliyun-sdk");

/** 阿里云日志服务 */
export function getSLS(config:any) {
  return new ALY.SLS({
    ...config,
    apiVersion: "2015-06-01",
  });
}

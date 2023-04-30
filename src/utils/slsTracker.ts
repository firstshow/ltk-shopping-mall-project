import FsSlsTracker from '@fubei/web-sls'
// 阿里云统计，公共部分参数
const param = {
  name: 'test'
}
/**
 * @constant 默认参数
 */
const OPTS = {
  host: 'cn-hangzhou.log.aliyuncs.com', // 所在地域的服务入口。例如cn-hangzhou.log.aliyuncs.com
  project: import.meta.env.VITE_TRACKER_PROJECT, // Project名称。
  logstore: import.meta.env.VITE_TRACKER_LOGSTORE, // Logstore名称。
  time: 10, // 发送日志的时间间隔，默认是10秒。
  count: 1 // 发送日志的数量大小，默认是10条。
}
const tracker = new FsSlsTracker(OPTS, param)
export default tracker

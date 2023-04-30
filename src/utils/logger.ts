// import { useUserStore } from '@/stores/modules/user'
import FsLogger from '@fubei/web-logger'
const env = import.meta.env.VITE_ENV

const logger = new FsLogger({
  host: 'cn-hangzhou.log.aliyuncs.com', // 所在地域的服务入口。例如cn-hangzhou.log.aliyuncs.com
  project: import.meta.env.VITE_TRACKER_PROJECT, // Project名称
  logstore: import.meta.env.VITE_TRACKER_LOGSTORE, // Logstore名称
  data() {
    return {
      AppId: `fs-vue3-mobile-${env}`,
      ...getCustomReport()
    }
  }
})
/**
 * @function 上报字段数组舍弃空值，生成字符串
 * @param arr {Array} 上报字段集合
 */
// function arrayJoinValue(arr) {
//   return arr.filter((item) => !!item).join(',')
// }
/**
 * @function 获取自定义上报对象
 */
function getCustomReport() {
  // const userInfo = useUserStore().userInfo
  // const user = [userInfo.realName, userInfo.unionid]
  return {
    // User: arrayJoinValue(user)
  }
}

export default logger

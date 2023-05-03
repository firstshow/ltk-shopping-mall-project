import { request } from '@/utils/http'

/**
 * @api 获取返利汇总数据统计
 */
export function userAuthServer() {
  return request({
    url: '/api/ltk/ltkLiveOrder-api/statistics',
    method: 'GET',
    noToken: true
  })
}

import { request } from '@/utils/http'

/**
 * @api 获取返利汇总数据统计
 */
export function getUserInfoServer() {
  return request({
    url: '/api/module/default/member/portal/user-api/info',
    method: 'GET',
    noToken: true
  })
}

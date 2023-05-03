import { request } from '@/utils/http'

/**
 * @api 获取返利汇总数据统计
 */
export function getOrderStatisticsServer() {
  return request({
    url: '/api/ltk/ltkLiveOrder-api/statistics',
    method: 'GET'
  })
}

/**
 * @api 获取订单列表
 */
export function getOrderListServer(data: API.OrderListParams) {
  return request({
    url: '/api/ltk/ltkLiveOrder-api/page',
    data,
    method: 'GET'
  })
}

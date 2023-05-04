import { request } from '@/utils/http'

/**
 * @api 获取返利汇总数据统计
 */
export function getOrderCommissionStatisticsServer() {
  return request<API.resResult<API.CommissionStatisticsInfo>>({
    url: '/api/ltk/ltkLiveOrder-api/statistics',
    method: 'GET'
  })
}

/**
 * @api 获取订单列表
 */
export function getOrderListServer(data: API.OrderListParams) {
  return request<API.resResult<API.OrderList>>({
    url: '/api/ltk/ltkLiveOrder-api/page',
    data,
    method: 'GET'
  })
}

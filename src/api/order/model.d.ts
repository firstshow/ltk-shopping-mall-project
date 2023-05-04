declare namespace API {
  /**
  * @type 全局通过表格查询返回结果-本地生活商品代运营
  */
  type resResult<T = any> = {
    result: T
    code: number
    message: string
    processInstanceId?: number
    success: boolean
    timestamp: number
  }

  /**
   * @type 获取订单列表请求参数
   */
  type OrderListParams = {
    pageNo?: number // 第几页
    pageSize?: number // 一页多少条
  }

  /**
   * @type 获取订单列表返回参数
   */
  type OrderList = {
    records: OrderInfo[]
    pages: number // 当前第几页
    size: number // 单页长度
    total: number // 列表总数
  }

  /**
   * @type 获取订单列表返回参数
   */
  type OrderInfo = {
    id: string // 第几页
    createTime: string // 一页多少条
    orderNo: string // 订单号
    list: ReceiveRecordsInfo[]
  }

  /**
   * @type 获取订单列表返回参数
   */
  type ReceiveRecordsInfo = {
    id: string // 第几页
    createTime: string // 一页多少条
    commission: number // 订单号
    status: string // 核销状态
  }

  /**
   * @type 获取订单列表返回参数
   */
  type CommissionStatisticsInfo = {
    receiveOrder: number // 已返订单
    totalCommission: number // 返现汇总
    waitReceiveCommission: number // 待返订单
  }
}


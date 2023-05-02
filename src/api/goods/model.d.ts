declare namespace API {
  /**
   * @type 获取商品列表请求参数
   */
  type GoodsListParams = {
    category?: string // 用户名
    keyword?: string // 搜索的关键字
    pageNo?: number // 第几页
    pageSize?: number // 一页多少条
  }
  /**
   * @type 进入直播间请求参数
   */
  type EnterLiveRoomParams = {
    id: string // 商品Id
  }
  /**
   * @type 领取返利请求参数
   */
  type ReceivePrizeParams = {
    orderNo: string // 订单号
  }
  /**
   * @type 商品信息
   */
  type CategoryInfo = {
    id: string // 商品id
    name: string // 商品名称
    price: number // 商品价格
  }

  /**
   * @type 商品信息
   */
  type GoodsInfo = {
    id: string // 商品id
    name: string // 商品名称
    price: number // 商品价格
  }
}


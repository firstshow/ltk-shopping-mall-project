declare namespace API {
  /**
    * @type 全局通过表格查询返回结果-本地生活商品代运营
    */
  type resResult <T = any> = {
    result: T
    code: number
    message: string
    processInstanceId?: number
    success: boolean
    timestamp: number
  }

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
    id: number // 商品Id
  }
  /**
   * @type 领取返利请求参数
   */
  type ApplyReceivePrizeParams = {
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
  type GoodsList = {
    pages: number // 商品id
    records: GoodsInfo[] // 列表数据
    size: number // 商品名称
    total: number // 商品价格
  }

  /**
   * @type 商品信息
   */
  type GoodsInfo = {
    shopInfo: string // 商品id
    list: GoodsCartList[] // 列表数据
  }

  /**
   * @type 商品信息
   */
  type GoodsCartList = {
    anchorName: string // 商品id
    cardData: GoodsCartData // 列表数据
    category: string // 类目
    commissionAmount: number // 佣金
    commissionRate: number // 返佣率
    liveRoomId: number // 直播间ID
    liveRoomUrl: string // 直播间链接
    poiAddress: string // 门店地址
    sortNo: number // 商品排名
  }
  /**
   * @type 商品信息
   */
  type GoodsCartData = {
    actual_amount: string // 实际支付价格
    actual_amount_num: number // 实际支付价格
    source: string // 商品名称
    origin_amount: string // 原价
    sold_count: number // 已售数量
    image_info: {
      width: number // 图片宽度
      height: number // 图片高度
      web_uri: string // 图片的uri
      web_url: string // 图片url
    }[]
    execution_plan: {
      activityId: number // 活动id
      goodId: number // 商品ID
    }
  }
}


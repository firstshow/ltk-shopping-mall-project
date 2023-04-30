declare namespace API {
  /**
   * @type 请求参数
   */
  type GoodsListParam = {
    name?: string // 用户名
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

import { request } from '@/utils/microserviceHttp'

/**
 * @api 获取商品列表
 */
export function getGoodsListServer(data: API.PageParams<API.GoodsListParam>) {
  return request<API.ListResult<API.GoodsInfo[]>>({
    url: 'com.fshows.goods.list',
    data,
    isMock: true
  })
}

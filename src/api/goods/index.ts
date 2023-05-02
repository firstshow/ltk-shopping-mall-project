import { request } from '@/utils/http'

/**
 * @api 获取类目列表
 */
export function getCategoryListServer() {
  return request<string[]>({
    url: '/api/ltk/ltkLiveGoods-api/categoryList',
    data: {},
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 获取商品列表
 */
export function getGoodsListServer(data: API.GoodsListParams) {
  return request<API.ListResult<API.GoodsInfo[]>>({
    url: '/api/ltk/ltkLiveGoods-api/page',
    data,
    method: 'GET'
  })
}

/**
 * @api 获取商品列表
 */
export function enterLiveRoomServer(data: API.EnterLiveRoomParams) {
  return request({
    url: '/api/ltk/ltkLiveGoods-api/enterLiveRoom',
    data,
    method: 'GET'
  })
}

/**
 * @api 获取商品列表
 */
export function receivePrizeServer(data: API.ReceivePrizeParams) {
  return request({
    url: '/api/ltk/ltkLiveOrder-api/add',
    data,
    method: 'GET'
  })
}


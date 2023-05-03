import { request } from '@/utils/http'

/**
 * @api 获取类目列表
 */
export function getCategoryListServer() {
  return request<API.resResult<string[]>>({
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
  return request<API.resResult<API.GoodsList>>({
    url: '/api/ltk/ltkLiveGoods-api/page',
    data,
    method: 'GET'
  })
}

/**
 * @api 进入直播间接口，进入直播间后，将讲解的商品展示为当前的商品
 */
export function enterLiveRoomServer(data: API.EnterLiveRoomParams) {
  return request({
    url: '/api/ltk/ltkLiveGoods-api/enterLiveRoom',
    data,
    method: 'GET'
  })
}

/**
 * @api 申请返利奖励接口
 */
export function receivePrizeServer(data: API.ApplyReceivePrizeParams) {
  return request({
    url: '/api/ltk/ltkLiveOrder-api/add',
    data,
    method: 'GET'
  })
}


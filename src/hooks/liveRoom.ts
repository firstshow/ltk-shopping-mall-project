import { getMobilePlatform } from '@/utils/device'
/**
 * @function 检测订单号是否正确
 */
export  const pickUpLiveRoomUrl = (urlStr: string) => {
  const index = urlStr.indexOf('https://')
  if (index > -1) {
    return urlStr.slice(index)
  }
  return urlStr
}

/**
 * @function 检测订单号是否正确
 */
export  const getLiveRoomUrlByPlatform = (urlStr: string) => {
  if (getMobilePlatform() === 'ios') {
    return pickUpLiveRoomUrl(urlStr)
  }
  return urlStr
}

import { MOBILE_PLATFORM } from '@/constants'

/**
 * @function 判断是否是微信浏览器
 * */
export const isWxBrowser = () => {
  const ua: string = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i)) {
    return true
  } else {
    return false
  }
}
/**
 * @function 判断是否是支付宝浏览器
 * */
export const isAliBrowser = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/alipaydefined/i)) {
    return true
  } else {
    return false
  }
}

/**
 * @function 判断是否是抖音客户端浏览器
 * */
 export const isDouyinBrowser = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/aweme/i)) {
    return true
  } else {
    return false
  }
}

/**
 * @function 判断是否是抖音极速版客户端浏览器
 * */
export const isDouyinLiteBrowser = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/aweme_lite/i)) {
    return true
  } else {
    return false
  }
}

/**
 * @function 判断手机是android还是ios
 * */
export const getMobilePlatform = () => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

  if (isAndroid) {
    return MOBILE_PLATFORM.android
  } else if (isIos) {
    return MOBILE_PLATFORM.ios
  } else {
    return MOBILE_PLATFORM.windows
  }
}

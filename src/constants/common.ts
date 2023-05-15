/**
 * @constant 路由白名单
 */
export const whiteNameList = ['icons', 'error', 'error-404']

/**
 * @constant 用户token
 */
export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'

/**
 * @constant 需要特殊处理的错误码
 */
export const ERROR_CODE = {
  loginTimeout: '302', // 登陆超时
  hasPendingAdPlan: '5001', // 该广告主有在投广告计划，不允许删除
  hasPendingAdPosition: '5002', // 该流量主有在投广告，不允许删除
  adPartnerShortNameNotOnly: '5003', // 该广告主简称已存在，请重新输入
  flowPartnerShortNameNotOnly: '5004' // 该流量主简称已存在，请重新输入
}

/**
 * @constant 错误处理
 */
export const ERROR_HANDLER = {
  [ERROR_CODE.loginTimeout]: () => {
    // 登录超时
  }
}

/**
 * @constant 错误处理
 */
export const MOBILE_PLATFORM = {
  ios: 'ios',
  android: 'android',
  windows: 'windows'
}

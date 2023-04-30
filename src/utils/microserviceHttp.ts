import FsFetch from '@fubei/web-fetch'
import Utils from 'fshows-utils-tool'
import { ACCESS_TOKEN_KEY } from '@/constants'
import { ERROR_HANDLER } from '@/constants'
import { getRandomString } from './public'
import { showToast } from 'vant'
import logger from './logger'
import dayjs from 'dayjs'

export interface RequestOptions<D> {
  url?: string
  data?: D
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE'
  retryTimes?: number
  isMock?: boolean
  contentType?: string
  noToken?: boolean
  specialError?: boolean
}

export type Response<T> = {
  code?: number
  message?: string
  success: boolean
  data: T
}

export type BaseResponse<T> = Promise<Response<T>>

const baseUrl = '/api'
const fsFetch = new FsFetch()
fsFetch.setSignParams({
  appid: 'XXX',
  content: '',
  salt: 'fXchxBDq',
  version: '1.0.0'
})
fsFetch.setMockUrl('http://127.0.0.1:4523/mock/1080891/')

fsFetch.customSuccessHandle = (result, _reqData, reqOptions, context) => {
  const { url, baseUrl, startTimeMs, data, header, method } = reqOptions
  const endTimeMs = new Date().getTime() // 请求结束时间
  const endTime = dayjs(endTimeMs).format('HH:mm:ss,SSS')
  logger.info(
    {
      ApiHost: /^http/.test(context?.baseUrl) ? context?.baseUrl : location.origin,
      ApiDuration: `${endTimeMs - startTimeMs}ms`,
      ApiMethod: `${method === 'POST' ? url : baseUrl}`,
      ApiRequest: data,
      ApiResponse: result.data,
      TraceId: header.traceId,
      Category: '网络请求',
      Content: {
        startTime: dayjs(startTimeMs).format('HH:mm:ss,SSS'),
        endTime: endTime,
        useTimes: context.useTimes
      }
    },
    'OBJECT'
  )
}

fsFetch.customErrorHandle = (error, _reqData, reqOptions, context) => {
  const endTimeMs = new Date().getTime() // 请求结束时间
  const endTime = dayjs(endTimeMs).format('HH:mm:ss,SSS')
  const { url, baseUrl, specialError, startTimeMs, method, data, header } = reqOptions
  if (ERROR_HANDLER[`${error.code}`]) {
    // 处理后端特殊异常
    ERROR_HANDLER[`${error.code}`]()
  } else if (!specialError) {
    // 当需要特殊处理，在调用的地方处理： 否则在同一错误里提示
    showToast(error.errorMsg)
  }
  logger.error(
    {
      ApiHost: /^http/.test(context?.baseUrl) ? context?.baseUrl : location.origin,
      ApiDuration: `${endTimeMs - startTimeMs}ms`,
      ApiMethod: `${method === 'POST' ? url : baseUrl}`,
      ApiRequest: data,
      ApiResponseError: error,
      TraceId: header.traceId,
      Category: '网络请求',
      Content: {
        startTime: dayjs(startTimeMs).format('HH:mm:ss,SSS'),
        endTime: endTime,
        useTimes: context.useTimes
      }
    },
    'OBJECT'
  )
}

export const request = <T>(reqOptions: RequestOptions<any> = {}): Promise<T> => {
  const { url, data = {} } = reqOptions
  const defaultOption = {
    isMock: false,
    retryTimes: 1,
    specialError: false,
    method: 'POST',
    ...reqOptions
  }
  const traceId = getRandomString()
  return fsFetch.request({
    url,
    data,
    header: {
      'Content-Type': defaultOption.contentType || 'application/x-www-form-urlencoded',
      token: defaultOption.noToken ? undefined : Utils.local.getItem(ACCESS_TOKEN_KEY),
      traceId
    },
    baseUrl,
    method: defaultOption.method,
    retryTimes: defaultOption.retryTimes,
    isMock: defaultOption.isMock,
    specialError: defaultOption.specialError,
    startTimeMs: new Date().getTime()
  })
}

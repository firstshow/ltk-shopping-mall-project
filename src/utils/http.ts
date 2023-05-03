/*
 * @Description: 自动生成api请求封装方法（新的请求方式）
 * @Author: guoxt
 * @Date: 2023-03-06 16:34
 * @LastEditors: guoxt
 * @LastEditTime: 2023-03-06 17:31
 */

import FsFetch from '@fubei/web-fetch'
import md5 from 'md5'
import Utils from 'fshows-utils-tool'
import { ACCESS_TOKEN_KEY } from '@/constants'
import { ERROR_HANDLER } from '@/constants'
import { showToast } from 'vant'
import { getRandomString, sortArrayObj } from './public'
import logger from './logger'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()


export interface RequestOptions<D = any> {
  url?: string
  data?: D
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE'
  retryTimes?: number
  isMock?: boolean
  contentType?: string
  noToken?: boolean
  specialError?: boolean
  mockUrl?: string
}

export type Response<T = any> = {
  code?: number
  message?: string
  success: boolean
  data: T
}

export type BaseResponse<T = any> = Promise<Response<T>>

const env = import.meta.env.VITE_ENV
/**
 * @function 请求header加签
 */
const getHeaderParams = (obj) => {
  const nonce = getRandomString()
  const timestamp = `${parseInt(Date.now() / 1000)}`
  const signObj = {
    content: typeof obj === 'string' ? obj : JSON.stringify(obj || {}),
    nonce,
    timestamp,
    salt: env === 'prod' ? 'b9IC4VkunCJQ' : 'IPj#dWgfWp'
  }

  const sortSignObj = sortArrayObj(Object.entries(signObj), 0).reduce((acc, cur) => {
    acc[cur[0]] = cur[1]
    return acc
  }, {})
  const signStr = JSON.stringify(sortSignObj)
  const sign = md5(signStr)
  return {
    sign,
    timestamp,
    nonce
  }
}

const baseUrl = 'https://group-guest-api.netmi.com.cn'
const fsFetch = new FsFetch()
fsFetch.setInterceptor(false)
fsFetch.setMockUrl('http://127.0.0.1:4523/mock/1080891/')

// TODO mock
// fsFetch.customJudgeSuccess = () => {
//   return true
// }

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

export const request = <T = any>(reqOptions: RequestOptions = {}): Promise<T> => {
  const { url, data = {} } = reqOptions
  const defaultOption = {
    isMock: false,
    retryTimes: 1,
    specialError: false,
    method: 'POST',
    ...reqOptions
  }
  const traceId = getRandomString()
  const headerParams = getHeaderParams(data)
  return fsFetch.request({
    url: url?.includes('.') ? `${url}` : url,
    data,
    header: {
      ...headerParams,
      token: '11222',
      'X-Access-Token': defaultOption.noToken ? undefined : userStore.accessToken,
      traceId
    },
    baseUrl,
    formatType: 'json',
    sendRawData: true,
    returnRawData: true,
    method: defaultOption.method,
    retryTimes: defaultOption.retryTimes,
    isMock: defaultOption.isMock,
    specialError: defaultOption.specialError,
    startTimeMs: new Date().getTime()
  })
}

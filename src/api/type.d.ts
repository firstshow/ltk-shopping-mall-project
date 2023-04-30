/* eslint-disable */

declare namespace API {
  /**
   * @type 全局通过表格查询返回结果
   */
  type ListResult<T = any> = {
    list: T
    totalCount?: number
  }

  /**
   * @type 全局通用表格分页请求参数
   */
  type PageParams<T = any> = {
    page?: number
    pageSize?: number
  } & {
    [P in keyof T]?: T[P]
  }

  /**
   * @type 错误响应数据
   */
  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string
    /** 业务上的错误信息 */
    errorMsg?: string
    /** 业务上的请求是否成功 */
    success?: boolean
  }
}

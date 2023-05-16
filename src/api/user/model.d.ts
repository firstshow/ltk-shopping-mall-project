declare namespace API {
  /**
   * @type 本地存储的用户信息
   */
  type UserInfo = {
    accessToken?: string // 登录token
    openId?: string // 用户openid
    nickname?: string // 昵称
    avatar?: string // 头像
  }
}


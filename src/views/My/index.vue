<template>
  <root-page class="my-page safe-area-inset-bottom">
    <!-- S 个人信息区域 -->
    <header class="x-my-profile-box flex items-center">
      <img class="x-header-img" :src="data.userInfo.avatar" alt="微信头像">
      <span class="x-nickname">{{ data.userInfo.nickname }}</span>
    </header>
    <!-- E 个人信息区域 -->

    <!-- S 返利汇总区域 -->
    <div class="x-statistics—box">
      <ul class="flex  justify-between">
        <li class="x-statistics-item flex flex-col items-center">
          <span class="x-value">{{ data.commissionStatisticsInfo.rebateOrder }}</span>
          <span class="x-key">已返订单</span>
        </li>
        <li class="x-statistics-item flex flex-col items-center">
          <span class="x-value">￥{{ data.commissionStatisticsInfo.totalCommission }}</span>
          <span class="x-key">累计返利</span>
        </li>
        <li class="x-statistics-item flex flex-col items-center">
          <span class="x-value">{{ data.commissionStatisticsInfo.waitRebateOrder }}</span>
          <span class="x-key">待返订单</span>
        </li>
      </ul>
      <span class="x-tips">订单核销后，将在当日20:00前发放返利金</span>
    </div>
    <!-- E 返利汇总区域 -->

    <van-list
      class="x-receive-list"
      v-model="data.loading"
      :finished="data.finished"
      finished-text="- 我是有底线的呦 -"
      @load="onOrderListLoad"
      >
      <receive-item
        v-for="(item) in data.orderList"
        :key="item.id"
        :data="item"
      />
    </van-list>
  </root-page>
</template>

<script setup lang="ts">
  import ReceiveItem from '@/views/My/components/receiveItem/index.vue'
  import { showLoadingToast, closeToast } from 'vant'
  import {
    getOrderCommissionStatisticsServer,
    getOrderListServer
  } from '@/api'
  import { useUserStore } from '@/stores/modules/user'
  const userStore = useUserStore()

  defineOptions({
    name: 'My'
  })

  let data = reactive({
    userInfo: {} as API.UserInfo,
    commissionStatisticsInfo: {} as API.CommissionStatisticsInfo,
    orderList: [] as API.OrderInfo[], // 商品列表
    orderListQueryParams: {
      category: '',
      keyword: '',
      pageNo: 1, // 当前第几页
      pageSize: 10 // 一页几条，默认10条
    },
    loading: false, // 是在加载中
    finished: false, // 是否加载完成
    total: 0 // 总共商品数据条数
  })

  /******************************** S 用户信息逻辑区域 ***********************************/
  /**
   * @function 初始化用户信息
   */
  const initUserInfo = async () => {
    const userInfo = userStore.userInfo
    data.userInfo.avatar = userInfo.avatar
    data.userInfo.nickname = userInfo.nickname
  }

  /******************************** S 佣金统计逻辑区域 ***********************************/
  const getOrderStatistics = async () => {
    try {
      let resData = await getOrderCommissionStatisticsServer()
      data.commissionStatisticsInfo = resData.result
      console.log('获取到的订单佣金统计数据成功：', resData)
    } catch (error) {
      console.log('获取到的订单佣金统计数据失败：', error)
    }
  }
  /******************************** E 佣金统计逻辑区域  ***********************************/


  /******************************** S 订单列表区域 ***********************************/
  /**
   * @function 获取订单列表
   */
  const getOrderList = async () => {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 10000
    })

    try {
      let { pageNo, pageSize } = data.orderListQueryParams
      let resData = await getOrderListServer({
        pageNo,
        pageSize,
      })
      if (data.orderListQueryParams.pageNo === 1) {
        data.orderList = resData.result.records
      } else {
        data.orderList = data.orderList.concat(resData.result.records)
      }
      console.log('++++++', data.orderList)
      data.loading = false
      data.total = resData.result.total
      data.orderListQueryParams.pageNo++
      data.finished = data.orderList.length >= data.total
      closeToast()
    } catch (error) {
      data.loading = false
      closeToast()
      console.log('获取商品列表失败', error)
    }
   }
    /**
    * @function 订单列表上拉加载回调事件
    */
    const onOrderListLoad = async () => {
    if (data.loading || data.finished) {
      return
    }
    data.loading = true
    getOrderList()
   }
  /******************************** E 订单列表区域  ***********************************/

  /******************************** S 生命周期钩子函数业务逻辑 ***********************************/
    onMounted(() => {
    console.log('ScenePage ~ onMounted')
    getOrderStatistics()
    initUserInfo()
  })
  /******************************** E 生命周期钩子函数业务逻辑 ***********************************/

</script>
<style lang="less" scoped>
  @import './index.less';
</style>

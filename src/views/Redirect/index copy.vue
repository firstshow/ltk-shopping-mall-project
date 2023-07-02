<template>
  <root-page class="home-page">
    <!-- S IOS的提示 -->
    <label class="x-tips-item" v-if="data.isIos">
      <span class="x-text">1.点击弹框中的【跳转】按钮，进入抖音直播间</span>
      <img class="x-img" :src="LOGICAL_IMAGE.iosEnterModel" alt="">
      <img class="x-img" src="https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/87d6c09669e4468d808a7b3135ead297?x-expires=1686643200&x-signature=nW3AZO2CNPgPL33uT6G9xt7F%2FUI%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=202306131054059E9B77CD7C63A64795F1" alt="">
    </label>
    <!-- E IOS的提示 -->

    <!-- S android的提示 -->
    <label class="x-tips-item" v-else >
      <span class="x-text">1.点击弹框</span>
      <img class="x-img" :src="LOGICAL_IMAGE.iosEnterModel" alt="">
      <img class="x-img" src="https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/87d6c09669e4468d808a7b3135ead297?x-expires=1686643200&x-signature=nW3AZO2CNPgPL33uT6G9xt7F%2FUI%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=202306131054059E9B77CD7C63A64795F1" alt="">
    </label>
    <!-- E android的提示 -->

    <label class="x-tips-item">
      <span class="x-text">2.进入抖音APP后，进入APP后会有直播间提醒框</span>
      <img class="x-img" src="https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/87d6c09669e4468d808a7b3135ead297?x-expires=1686643200&x-signature=nW3AZO2CNPgPL33uT6G9xt7F%2FUI%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=202306131054059E9B77CD7C63A64795F1" alt="">
    </label>
    <label class="x-tips-item">
      <span class="x-text">3.点击直播间右下角讲解商品可查看团购详情和下单</span>
      <img class="x-img" src="https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/87d6c09669e4468d808a7b3135ead297?x-expires=1686643200&x-signature=nW3AZO2CNPgPL33uT6G9xt7F%2FUI%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=202306131054059E9B77CD7C63A64795F1" alt="">
    </label>
    <label class="x-tips-item padding-bottom-100">
      <span class="x-text">4.下单成功后，将订单号复制回填，领取奖励</span>
      <img class="x-img" src="https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/87d6c09669e4468d808a7b3135ead297?x-expires=1686643200&x-signature=nW3AZO2CNPgPL33uT6G9xt7F%2FUI%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=202306131054059E9B77CD7C63A64795F1" alt="">
    </label>


    <!-- S 底部操作栏 -->
    <footer class="x-footer-operate-box safe-area-inset-bottom flex items-center justify-between">
      <van-button plain hairline type="primary" @click="jumpMy">查看我的返利</van-button>
      <van-button type="primary" size="normal" @click="openReceivePrizePopup">我已下单，领取返利</van-button>
    </footer>
    <!-- E 底部操作栏 -->

     <!-- S 领取奖励的弹框 -->
     <receive-popup
      :show="showReceivePopup"
      v-model:orderNo="data.orderNo"
      @close="closeReceivePopup"
      @onClick="applyReceivePrize"
    />
    <!-- E 领取奖励的弹框 -->
  </root-page>
</template>

<script setup lang="ts">
  import ReceivePopup from '@/views/Home/components/ReceivePopup/index.vue'
  import { showLoadingToast, closeToast, showDialog, showToast } from 'vant'
  import { getMobilePlatform } from '@/utils/device'
  import { getLiveRoomUrlByPlatform, setClipboardContent, routeChange, checkOrderNo } from '@/hooks'
  import { MOBILE_PLATFORM, ROUTE_MAP, LOGICAL_IMAGE } from '@/constants'
  import { enterLiveRoomServer, receivePrizeServer } from '@/api'
  import { useRoute } from 'vue-router'

  const router = useRoute()

  defineOptions({
    name: 'Redirect'
  })

  let data = reactive({
    isShowDialog: true,
    orderNo: '', // 返利订单号
    isIos: getMobilePlatform() === MOBILE_PLATFORM.ios,
  })

  /**
    * @function 进入直播间，直播间商品切换成当前商品
    * @param id 商品ID
    */
    const enterLiveRoom = async () => {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 10000
    })


    try {
      let id = router.query.keyword as string
      let resData = await enterLiveRoomServer({
        id
      })
      closeToast()
      let url = getLiveRoomUrlByPlatform(resData.result.liveRoomUrl)
      setTimeout(() => jumpToLiveRoom(url), 200);
      console.log('获取直播间参数成功：', resData)
    } catch (error) {
      closeToast()
      console.log('进入直播间失败：', error)
    }
   }

   /**
    * @function 跳转到直播间，这边安卓和IOS处理不一样
    * @param url 直播间地址
    */
   const jumpToLiveRoom = async (url: string) => {
    switch (getMobilePlatform()) {
      case MOBILE_PLATFORM.android:
        await setClipboardContent(url)
        showDialog({
          title: '复制成功',
          message: '请打开抖音APP，出现直播间弹框提示后，进入直播间下单',
        })
        break
      case MOBILE_PLATFORM.ios:
      case MOBILE_PLATFORM.windows:
        window.location.href = url
        break
      default:
        console.error('不属于任何一个平台')
    }
   }


  /******************************** S 底部操作栏业务逻辑 ***********************************/
  const showReceivePopup = ref(false)

  /**
   * @function 打开领取弹框
   */
  const openReceivePopup = () => {
    showReceivePopup.value = true
  }
   /**
   * @function 关闭领取弹框
   */
  const closeReceivePopup = () => {
    showReceivePopup.value = false
  }
  /**
   * @function 跳转至我的页面
   */
  const jumpMy = () => {
    console.log('跳转进我的')
    routeChange(ROUTE_MAP.my)
  }
  /**
   * @function 打开领取奖励弹框
   */
  const openReceivePrizePopup = () => {
    console.log('领取奖励')
    showReceivePopup.value = true
    openReceivePopup()
  }
  /**
   * @function 领取奖励
   */
   const applyReceivePrize = async () => {
    // 检查订单号是否正确，一定要符合抖音的订单号规则
    if (checkOrderNo(data.orderNo)) {
      showToast({ message: '请正确复制19位抖音订单号' })
      return false
    }

    try {
      showLoadingToast({
        message: '提交中...',
        forbidClick: true,
        duration: 10000
      })

      let resData = await receivePrizeServer({
        orderNo: data.orderNo
      })
      closeToast()
      jumpMy()
      console.log('申请领取奖励成功：', resData)
    } catch (error) {
      closeToast()
      console.log('申请领取奖励失败：', error)
    }
   }
  /******************************** E 底部操作栏业务逻辑 ***********************************/

  /******************************** S 生命周期钩子函数业务逻辑 ***********************************/
  onMounted(() => {
    enterLiveRoom()
  })
  /******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>
<style lang="less" scoped>
  @import './index.less';
</style>

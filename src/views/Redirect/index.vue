<template>
  <root-page class="home-page">
    欢迎光临来团客商城
  </root-page>
</template>

<script setup lang="ts">
  import { showLoadingToast, closeToast, showDialog } from 'vant'
  import { getMobilePlatform } from '@/utils/device'
  import { getLiveRoomUrlByPlatform, setClipboardContent } from '@/hooks'
  import { MOBILE_PLATFORM } from '@/constants'
  import { enterLiveRoomServer } from '@/api'
  import { useRoute } from 'vue-router'

  const router = useRoute()

  defineOptions({
    name: 'Redirect'
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
    let url = getLiveRoomUrlByPlatform('https://group-api.hello-ltk.com/module/default/member/portal/nl/wxAuth/login?toPage=redirect&keyword=1674672798591614977')
    try {
      let id = router.query.keyword as string
      let resData = await enterLiveRoomServer({
        id
      })
      closeToast()
      jumpToLiveRoom(url)
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
   const jumpToLiveRoom = (url: string) => {
    switch (getMobilePlatform()) {
      case MOBILE_PLATFORM.android:
        console.log('复制的链接：', url)
        showDialog({
          title: '提示',
          message: '点击“复制并前往”，再打开抖音APP，出现直播间弹框提示后，进入直播间下单',
          confirmButtonText: '复制并前往',
          beforeClose: () => {
            console.log('1212')
            setClipboardContent(url, true, '复制成功，请打开抖音APP')
            return true
          }
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

  /******************************** S 生命周期钩子函数业务逻辑 ***********************************/
  onMounted(() => {
    enterLiveRoom()
   })
  /******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>
<style lang="less" scoped>
  @import './index.less';
</style>

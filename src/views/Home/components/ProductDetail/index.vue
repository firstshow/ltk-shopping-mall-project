<template>
  <van-popup ref="productDetailPopup" :show="show" round position="bottom" @click-overlay="$emit('close')">
    <div class="x-product-detail-popup">
      <!-- S 弹框头部 -->
      <header class="x-product-header">
        <van-swipe ref="imageSwipeRef" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="(item) in data.productInfo.nodes?.grouponDetail.data.images?.image_list"
            :key="item.url"
            >
            <img :src="item.url" alt="轮播图">
          </van-swipe-item>
        </van-swipe>
      </header>
      <!-- E 弹框头部 -->
      <div class="x-product-body">
        <!-- S 商品价格展示区域 -->
        <div class="x-product-price-box flex justify-between items-center">
          <div class="x-price-box">
            <label>
              <span class="x-price-symbol">￥</span>
              <span class="x-sale-price">{{ data.productInfo.nodes?.mainInfoGroup.data.skuPriceInfo.SkuPostCouponPrice / 100 }}</span>
            </label>
            <span class="x-original-price">￥{{data.productInfo.nodes?.mainInfoGroup.data.skuPriceInfo.SkuOriginPrice / 100 }}</span>
          </div>
          <div class="x-sales-count">
            <span>已售 {{ props.productInfo.cardData.sold_count }} 份</span>
          </div>
        </div>
        <!-- E 商品价格展示区域 -->

        <!-- S 门店信息 -->
        <div class="x-info-box x-title-box">
          <h3 class="x-title">{{ props.productInfo.cardData.source }}</h3>
          <p class="x-service">
            <span class="x-sub-title">服务</span>
            <span>随时退·过期退·全网最低价</span>
          </p>
          <p class="x-address">
            <span class="x-sub-title">门店</span>
            <span>{{ props.productInfo.poiAddress }}</span>
          </p>
        </div>
        <!-- E 门店信息 -->

        <!-- S 套餐详情信息 -->
        <div class="x-info-box x-detail-box">
          <h3 class="x-title">团购详情</h3>
          <label
            class="x-detail-group-box"
            v-for="(item) in data.productInfo.nodes?.grouponDetail.data.itemGroups"
            :key="item.group_name"
            >
            <h3>{{ item.group_name }}</h3>
            <ul>
              <li
                class="x-detail-item flex justify-between items-center"
                v-for="(subItem) in  item.item_list"
                :key="`${subItem.name}-${subItem.count}-${subItem.pric}`"
              >
                <span>{{ subItem.name }}</span>
                <span>
                  <span class="x-count">({{ subItem.count }} {{ subItem.unit_alias }})</span>
                  <span>￥{{ subItem.price / 100 }}</span>
                </span>
              </li>
            </ul>
          </label>
          <label
            class="x-detail-group-box"
            v-if="data.productInfo.nodes?.grouponDetail.data.images?.environment_image_list?.length > 0"
            >
            <h3>图片详情</h3>
            <ul>
              <li
                class="x-environment-image-item"
                v-for="(item) in data.productInfo.nodes?.grouponDetail.data.images?.environment_image_list"
                :key="item.url"
              >
                <img :src="item.url" alt="环境图片">
              </li>
            </ul>
          </label>
        </div>
        <!-- E 套餐详情信息 -->

        <!-- S 使用须知信息 -->
        <div class="x-info-box x-detail-box">
          <h3 class="x-title">购买须知</h3>
          <label
            class="x-detail-group-box"
            v-for="(item) in data.productInfo.nodes?.mainInfoGroup.data.productAttr.new_use_rule_v2.body"
            :key="item.key"
          >
            <h3>{{ item.name }}</h3>
            <ul>
              <li
                class="x-detail-item"
                v-for="(subItem) in item.value"
                :key="subItem.content"
              >
                <span>{{ subItem.content }}</span>
              </li>
            </ul>
          </label>
        </div>
        <!-- E 使用须知信息 -->
      </div>

      <!-- S 操作按钮区 -->
      <div class="x-operate-box safe-area-inset-bottom flex justify-between items-center">
        <div class="x-price-box">
          <label>
            <label>
              <span class="x-price-symbol">￥</span>
              <span class="x-sale-price">{{ data.productInfo.nodes?.mainInfoGroup.data.skuPriceInfo.SkuPostCouponPrice / 100 }}</span>
            </label>
            <span class="x-original-price">￥{{data.productInfo.nodes?.mainInfoGroup.data.skuPriceInfo.SkuOriginPrice / 100 }}</span>
          </label>
          <p style="line-height: 12px;">
            <span class="x-discount-price">核销后返￥{{ props.productInfo.commissionAmount }}</span>
          </p>
        </div>
        <van-button
          type="primary"
          block
          class="x-buy-btn"
          @click="enterLiveRoom"
        >
          进直播间抢购
        </van-button>
      </div>
      <!-- E 操作按钮区 -->
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { showLoadingToast, closeToast, showDialog } from 'vant'
import { getMobilePlatform } from '@/utils/device'
import { getLiveRoomUrlByPlatform, setClipboardContent } from '@/hooks'
import { MOBILE_PLATFORM } from '@/constants'
import { enterLiveRoomServer, getGoodsDetailServer } from '@/api'
const props = defineProps({
  // 是否显示弹层
  show: {
    type: Boolean,
    default: false
  },
  // 当前选择的商品详情信息
  productInfo: {
    type: Object,
    default: {}
  }
})
// 图片轮播组件
const imageSwipeRef = ref()
const productDetailPopup = ref()

let data = reactive({
  productInfo: {} as API.GoodInfo
  })

  /**
   * @function 获取商品详情
   */
  const getProductDetail = async () => {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 500
    })
    try {
      let resData = await getGoodsDetailServer({
        componentId: props.productInfo.componentId
      })
      data.productInfo = JSON.parse(resData.result.ProductSerializationData)
      imageSwipeRef.value.swipeTo(0)
      console.log('返回的参数：', data.productInfo)
      nextTick(() => {
        setTimeout(closeToast, 800)
      })
    } catch (error) {
      closeToast()
    }
  }

   /**
    * @function 进入直播间，直播间商品切换成当前商品
    * @param id 商品ID
    */
    const enterLiveRoom = async () => {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 500
    })

    let url = getLiveRoomUrlByPlatform(props.productInfo.liveRoomUrl)
    try {
      let id = props.productInfo.id
      let resData = await enterLiveRoomServer({
        id
      })
      closeToast()
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

//暴露getProductDetail方法
defineExpose({
  getProductDetail
})
</script>
<style lang="less" scoped>
@import './index.less';
</style>

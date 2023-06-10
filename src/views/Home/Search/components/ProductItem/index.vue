<template>
  <div class="x-product-item">
    <!-- S 门店名称区域 -->
    <div class="x-shop-name flex justify-left items-center">
      <svg-icon name="IconStore" size="12" />
      <span class="x-name">{{ data.card_data.poi.shop_info }}</span>
    </div>
    <!-- E 门店名称区域  -->

    <div
      class="x-product-info-box flex"
      @click="$emit('onClick', data.card_data.groupon_id)"
    >
      <!-- S 商品图片区域 -->
      <div class="x-product-img">
        <img
          v-lazy="filterProductImg(data.card_data.image_info[0]?.web_url)"
          :loading="LOGICAL_IMAGE.loading"
          :error="LOGICAL_IMAGE.loadError"
          alt="商品图片"
        >
      </div>
      <!-- E 商品图片区域 -->

      <!-- S 商品信息区域 -->
      <div class="x-product-info flex flex-col">
        <h3>{{ data.card_data.source }}</h3>
        <!-- S 商品标签和销售 -->
        <div class="flex items-center justify-between">
          <label class="flex items-center justify-center">
            <span class="x-label">随时退</span>
            <span class="x-label">过期退</span>
            <span class="x-label">全网最低价</span>
          </label>
          <span class="x-sale-count">已售 {{ data.card_data.sold_count }}</span>
        </div>
        <!-- E 商品标签和销售 -->

        <!-- S 商品价格和优惠区域 -->
        <div class="x-price-box flex justify-between item-center">
          <label class="x-real-price">
            <span class="x-old-price">{{ data.card_data.origin_amount }}</span>
            <span class="x-price">{{ data.card_data.actual_amount }}</span>
          </label>
          <label class="x-discount-price">
            <span>返</span>
            <span class="x-price">￥{{ data.card_data.commissionAmount }}</span>
          </label>
        </div>
         <!-- E 商品价格和优惠区域 -->
      </div>
      <!-- E 商品信息区域 -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { LOGICAL_IMAGE } from '@/constants'
  defineOptions({
    name: 'Home'
  })
  defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
  /**
   * @function 过滤商品图片，抖音的图片做了特殊处理，需要将\\替换为\,才能正确识别
   */
  const filterProductImg = (url) => {
    url.replace('\/\/', '\/')
    return url
  }
</script>
<style lang="less" scoped>
  @import './index.less';
</style>

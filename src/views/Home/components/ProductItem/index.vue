<template>
  <div class="x-product-item">
    <!-- S 门店名称区域 -->
    <div class="x-shop-name flex justify-left items-center">
      <svg-icon name="IconStore" size="12" />
      <span class="x-name">{{ data.shopInfo }}</span>
    </div>
    <!-- E 门店名称区域  -->

    <div
      class="x-product-info-box flex"
      v-for="(item) in data.list"
      :key="(item as API.GoodsCartList).cardData.source"
      @click="$emit('onClick', (item as API.GoodsCartList).cardData.execution_plan.goodId)"
    >
      <!-- S 商品图片区域 -->
      <div class="x-product-img">
        <span class="x-subscript">{{ (item as API.GoodsCartList).sortNo }}</span>
        <img :src="filterProductImg((item as API.GoodsCartList).cardData?.image_info[0]?.web_url)" alt="商品图片">
      </div>
      <!-- E 商品图片区域 -->

      <!-- S 商品信息区域 -->
      <div class="x-product-info flex flex-col">
        <h3>{{ (item as API.GoodsCartList).cardData.source }}</h3>
        <!-- S 商品标签和销售 -->
        <div class="flex items-center justify-between">
          <label class="flex items-center justify-center">
            <span class="x-label">随时退</span>
            <span class="x-label">过期退</span>
            <span class="x-label">全网最低价</span>
          </label>
          <span class="x-sale-count">已售 {{ (item as API.GoodsCartList).cardData.sold_count }}</span>
        </div>
        <!-- E 商品标签和销售 -->

        <!-- S 商品价格和优惠区域 -->
        <div class="x-price-box flex justify-between item-center">
          <label class="x-real-price">
            <span class="x-old-price">{{ (item as API.GoodsCartList).cardData.origin_amount }}</span>
            <span class="x-price">{{ (item as API.GoodsCartList).cardData.actual_amount }}</span>
          </label>
          <label class="x-discount-price">
            <span>返</span>
            <span class="x-price">￥{{ (item as API.GoodsCartList).cardData.actual_amount_num }}</span>
          </label>
        </div>
         <!-- E 商品价格和优惠区域 -->
      </div>
      <!-- E 商品信息区域 -->
    </div>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Home'
  })
  defineProps({
    data: {
      type: Object,
      default: () => ({
        shopInfo: '',
        list: [
          {
            cardData: {
              source: ''
            }
          }
        ]
      })
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

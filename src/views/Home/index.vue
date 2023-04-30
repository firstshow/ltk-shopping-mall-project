<template>
  <root-page class="home-page">
    <!-- S 操作提示 -->
    <shopping-tips/>
    <!-- E 操作提示 -->
    <!-- S 直播间商品列表 -->
    <div class="x-product-outside-box">
      <div class="x-inside-box">
        <div class="x-category-selection">
          <span :class="['x-category-item', selectedCategoryName === item.name ? 'x-item-selected' : '']" v-for="item in categoryList" :key="item.name">{{ item.name }}</span>
        </div>
        <div class="x-list">
          <product-item

          />
        </div>
      </div>
    </div>
    <!-- E 直播间商品列表 -->
  </root-page>
</template>

<script setup lang="ts">
  import ShoppingTips from '@/views/Home/components/ShoppingTips/index.vue'
  import ProductItem from '@/views/Home/components/ProductItem/index.vue'
  defineOptions({
    name: 'Home'
  })

  // 类目列表
  const categoryList = reactive([
    {
      name: '全部'
    },
    {
      name: '美食'
    },
    {
      name: '休娱'
    },
    {
      name: '游玩'
    }
  ])
   const selectedCategoryName = ref('全部')
</script>
<style lang="less" scoped>
  @import './index.less';
</style>

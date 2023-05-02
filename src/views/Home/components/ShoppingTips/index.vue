<template>
  <ul class="x-guidance-box flex justify-between" >
    <li
      class="x-item flex flex-col items-center"
      v-for="item in guidanceItems"
    >
      <svg-icon :name="item.iconName" size="18" />
      <span class="x-tips">{{ item.firstLineText }}</span>
      <span>{{ item.secondLineText }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Home'
  })

  // 操作步骤数据表
  const guidanceItems = reactive([
    {
      iconName: 'IconDouyinLogo',
      firstLineText: '点击商品',
      secondLineText: '跳转抖音'
    },
    {
      iconName: 'IconShoppingCart',
      firstLineText: '直播间',
      secondLineText: '小房子下单'
    },
    {
      iconName: 'IconOrderSuccess',
      firstLineText: '下单成功',
      secondLineText: '复制订单号'
    },
    {
      iconName: 'IconOrderEnter',
      firstLineText: '提交订单号',
      secondLineText: '领取返利'
    }
  ])
</script>
<style lang="less" scoped>
  @import './index.less';
</style>

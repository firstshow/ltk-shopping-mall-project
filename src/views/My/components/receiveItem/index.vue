<template>
  <div class="x-receive-item">
    <div class="flex justify-between items-center">
      <h3 class="flex items-center">
        <span class="x-order-sn">订单 8000001245679688890</span>
        <svg-icon name="IconCopy" size="12" />
      </h3>
      <span class="x-receive-price" v-if="status !== 1">+20</span>
    </div>
    <p class="x-submit-time">2023-04-10 10:29 提交</p>

    <!-- S 未核销时的提示 -->
    <p class="x-write-off-tips" v-if="status === 1">核销后即可领取返利，快去核销吧</p>
    <!-- E 未核销时的提示 -->

    <!-- S 未核销时的提示 -->
    <ul class="x-received-list" v-else>
      <li>2023-03-16 10:29  领取返利金 10 元</li>
      <li>2023-03-16 10:29  领取返利金 10 元</li>
      <li>2023-03-16 10:29  领取返利金 10 元</li>
    </ul>
    <!-- E 未核销时的提示 -->

  </div>
</template>

<script setup lang="ts">
  defineProps({
    // 领取状态，内容根据领取状态展示不同
    status: {
      type: Number,
      default: 1
    }
  })
</script>
<style lang="less" scoped>
  @import './index.less';
</style>

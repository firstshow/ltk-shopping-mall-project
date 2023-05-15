<template>
  <div class="x-receive-item">
    <div class="flex justify-between items-center">
      <h3 class="flex items-center">
        <span class="x-order-sn">订单 {{ data.orderNo }}</span>
        <svg-icon name="IconCopy" size="12" @click="copy()" />
      </h3>
      <span class="x-receive-price" v-if="data.list?.length > 0">+{{ data.totalCommission }}</span>
    </div>
    <p class="x-submit-time">{{ data.createTime }} 提交</p>

    <!-- S 未核销时的提示 -->
    <ul class="x-received-list" v-if="data.list?.length > 0">
      <li
        v-for="(item) in data.list"
        :key="(item as API.ReceiveRecordsInfo).id"
      >{{ (item as API.ReceiveRecordsInfo).createTime }}  领取返利金 {{ (item as API.ReceiveRecordsInfo).commission }} 元</li>
    </ul>
    <!-- E 未核销时的提示 -->

    <!-- S 未核销时的提示 -->
    <p class="x-write-off-tips" v-else>核销后即可领取返利，快去核销吧</p>
    <!-- E 未核销时的提示 -->

  </div>
</template>

<script setup lang="ts">
  import { setClipboardContent } from '@/hooks'
  const props = defineProps({
    // 领取状态，内容根据领取状态展示不同
    status: {
      type: Number,
      default: 1
    },
    data: {
      type: Object,
      default: () => ({})
    }
  })

  /**
   * @function 点击复制图标，复制订单号
   */
  const copy =  () => {
    setClipboardContent(props.data.orderNo)
  }
</script>
<style lang="less" scoped>
  @import './index.less';
</style>

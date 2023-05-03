<template>
  <van-popup :show="show" round position="bottom" @click-overlay="$emit('close')">
    <!-- S 弹框头部 -->
    <header class="x-receive-header">
      <h3>提交订单，领取返利</h3>
      <span class="x-confirm-btn" @click="$emit('onClick')">确认</span>
    </header>
    <!-- E 弹框头部 -->

    <!-- S 弹框头部 -->
    <div class="x-receive-body">
      <van-field ref="receiveOrderSnInput" v-model="inputVal" type="number" placeholder="请输入订单号">
        <template #button>
          <van-button plain hairline size="small" type="primary" @click="pasteOrderSn">黏贴订单号</van-button>
        </template>
      </van-field>

      <div class="x-receive-tips-box">
        <span class="x-tips-text">请在抖音订单页详情，向下滑动找到订单号，复制后在此处粘贴提交，待订单核销后即可领取返利。</span>
        <img class="x-tips-img" :src="LOGICAL_IMAGE.receiveTipsImg" alt="">
      </div>
    </div>
    <footer></footer>
  </van-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LOGICAL_IMAGE } from '@/constants'
import { getClipboard, checkOrderNo } from '@/hooks'
import { showToast } from 'vant'
const props = defineProps({
  // 是否显示弹层
  show: {
    type: Boolean,
    default: false
  },
  // 申请返现的订单号
  orderNo: {
    type: String,
    default: NaN
  }
})
const emit = defineEmits(['update:orderNo', 'close', 'onClick'])
/******************************** S 订单号操作区域 ***********************************/
// 输入框内容，抖音订单号，做双向绑定
let inputVal = computed({
  get: () => {
    return props.orderNo
  },
  set: (val) => {
    emit('update:orderNo', val)
  }
})
// 订单号输入框元素
const receiveOrderSnInput = ref<HTMLElement>()

/**
 * @function 黏贴订单号
 */
const pasteOrderSn = async () => {
  let text = await getClipboard()

  if (checkOrderNo(text)) {
    showToast({ message: '请复制8开头的19位抖音订单号' })
    return false
  }

  inputVal.value = text
}
  /******************************** E 订单号操作区域 ***********************************/
</script>
<style lang="less" scoped>
@import './index.less';
</style>

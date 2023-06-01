<template>
  <van-popup :show="show" round position="bottom" @click-overlay="$emit('close')">
    <!-- S 弹框头部 -->
    <header class="x-product-header">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item) in data.productImage.images">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
    </header>
    <!-- E 弹框头部 -->
    <div class="x-product-body">
      asdadada
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LOGICAL_IMAGE } from '@/constants'
// import { getClipboardContent, checkOrderNo } from '@/hooks'
// import { showToast } from 'vant'
const props = defineProps({
  // 是否显示弹层
  show: {
    type: Boolean,
    default: false
  }
})

let data = reactive({
    productImage: {
      current: 0,
      images: [
        'https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/ab533d54c3304fe99e0fea912d99ebd9?x-expires=1685523600&x-signature=M7GJEKCc1mzOaO6plvKCkJ7ONsY%3D&from=3641867985',
        'https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/ab533d54c3304fe99e0fea912d99ebd9?x-expires=1685523600&x-signature=M7GJEKCc1mzOaO6plvKCkJ7ONsY%3D&from=3641867985',
        'https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/ab533d54c3304fe99e0fea912d99ebd9?x-expires=1685523600&x-signature=M7GJEKCc1mzOaO6plvKCkJ7ONsY%3D&from=3641867985',
        'https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/ab533d54c3304fe99e0fea912d99ebd9?x-expires=1685523600&x-signature=M7GJEKCc1mzOaO6plvKCkJ7ONsY%3D&from=3641867985',
        'https://p3-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/ab533d54c3304fe99e0fea912d99ebd9?x-expires=1685523600&x-signature=M7GJEKCc1mzOaO6plvKCkJ7ONsY%3D&from=3641867985'
      ]
    }
  })
// const emit = defineEmits(['update:orderNo', 'close', 'onClick'])

</script>
<style lang="less" scoped>
@import './index.less';
</style>

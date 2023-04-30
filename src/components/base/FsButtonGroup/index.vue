<template>
  <div class="fs-button-group flex items-center justify-between">
    <van-button
      v-if="showSecondaryButton"
      class="secondary-btn"
      :plain="plain"
      round
      :block="!showMainButton && showSecondaryButton"
      type="primary"
      :disabled="secondaryButtonDisabled"
      :loading="secondaryButtonLoading"
      @click="emit('secondaryButtonClick')"
    >
      {{ secondaryButtonText }}
    </van-button>
    <van-button
      v-if="showMainButton"
      class="main-btn"
      round
      :block="showMainButton && !showSecondaryButton"
      type="primary"
      :disabled="mainButtonDisabled"
      :loading="mainButtonLoading"
      @click="emit('mainButtonClick')"
    >
      {{ mainButtonText }}
    </van-button>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'FsBottomGroup'
  })
  defineProps({
    // 次要按钮文案
    secondaryButtonText: {
      type: String,
      default: '取消'
    },
    // 主按钮文案
    mainButtonText: {
      type: String,
      default: '确定'
    },
    // 显示次要按钮
    showSecondaryButton: {
      type: Boolean,
      default: true
    },
    // 显示主按钮
    showMainButton: {
      type: Boolean,
      default: true
    },
    // 禁用次要按钮
    secondaryButtonDisabled: {
      type: Boolean,
      default: false
    },
    // 禁用主按钮
    mainButtonDisabled: {
      type: Boolean,
      default: false
    },
    // 次要按钮loading
    secondaryButtonLoading: {
      type: Boolean,
      default: false
    },
    // 主按钮loading
    mainButtonLoading: {
      type: Boolean,
      default: false
    },
    // 是否朴素按钮
    plain: {
      type: Boolean,
      default: true
    }
  })
  const emit = defineEmits(['secondaryButtonClick', 'mainButtonClick'])
</script>

<style lang="less" scoped>
  @import './index.less';
</style>

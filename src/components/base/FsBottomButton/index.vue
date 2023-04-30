<template>
  <div
    :class="[
      'fs-bottom-button',
      {
        'safe-area-inset-bottom': safeAreaInsetBottom
      }
    ]"
  >
    <fs-button-group v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
  import FsButtonGroup from '../FsButtonGroup/index.vue'

  defineOptions({
    name: 'FsBottomButton'
  })
  defineProps({
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>

<template>
  <div class="root-page" :class="{ 'auto-height': autoHeight }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'RootPage'
  })
  defineProps({
    autoHeight: {
      type: Boolean,
      default: false
    }
  })
</script>
<style lang="less">
  .root-page {
    min-height: 100vh;
    background: @bg-gray;

    &.auto-height {
      height: auto;
      min-height: 100vh;
      -webkit-overflow-scrolling: touch;
    }
    padding-bottom: constant(safe-area-inset-bottom); /* 当然也可以写 margin、bottom …… */
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>

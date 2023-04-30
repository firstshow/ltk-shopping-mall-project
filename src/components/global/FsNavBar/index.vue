<template>
  <van-nav-bar
    safe-area-inset-top
    fixed
    left-arrow
    :border="false"
    @click-left="routeGoBack()"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
  import { routeGoBack } from '@/hooks'
  defineOptions({
    name: 'FsNavBar'
  })
</script>

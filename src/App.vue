<template>
  <RouterView />

  <div class="copyTxt" style="opacity: 0; position: absolute; width: 1px; height:1px; overflow: hidden" id="copyTxt"></div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'App'
  })
</script>

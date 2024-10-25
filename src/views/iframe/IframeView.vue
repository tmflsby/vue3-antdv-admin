<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <a-card>
    <iframe
      class="w100% h800px border-none"
      :src="route.meta.iframe"
      :name="route.name"
    />
  </a-card>
</template>

<style lang="less" scoped></style>

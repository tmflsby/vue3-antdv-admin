<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <ACard>
    <iframe class="w100% h800px border-none" :src="route.meta.iframe" :name="route.name" />
  </ACard>
</template>

<style lang="less" scoped></style>

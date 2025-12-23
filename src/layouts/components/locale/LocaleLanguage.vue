<script setup>
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { i18nSettings } from '@/settings/layoutTheme.js'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'

const { t } = useI18n()
const layoutThemeStore = useLayoutThemeStore()

const changeLocaleLanguage = (language) => {
  layoutThemeStore.updateLayoutSetting({ language })
}
</script>

<template>
  <ADropdown>
    <template #overlay>
      <AMenu>
        <AMenuItem
          v-for="item in i18nSettings"
          :key="item.value"
          @click="changeLocaleLanguage(item.value)"
        >
          {{ t(item.label) }}
        </AMenuItem>
      </AMenu>
    </template>
    <Icon class="iconify anticon" icon="grommet-icons:language" />
  </ADropdown>
</template>

<style scoped lang="less"></style>

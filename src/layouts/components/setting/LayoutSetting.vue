<script setup>
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { layouts, themeColors, uiSettings, animations } from '@/settings/layoutTheme.js'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import { useSystemStore } from '@/store/layout/system.js'

const { t } = useI18n()
const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = computed(() => layoutThemeStore.layoutSetting)
const colorPrimary = computed(() => layoutThemeStore.layoutSetting.colorPrimary)
const colorPickerStyle = computed(() => ({
  '--custom-color': colorPrimary.value,
}))

const systemStore = useSystemStore()

const visible = ref(false)
const showDrawer = () => {
  visible.value = true
}

const setLayout = (layout) => {
  layoutThemeStore.updateLayoutSetting({ layout })
}

const setThemeColor = (colorPrimary) => {
  layoutThemeStore.updateLayoutSetting({ colorPrimary })
}

const getThemeColorVisible = (color) => (colorPrimary.value === color ? 'visible' : 'hidden')

const copySettings = () => {
  const settings = JSON.stringify(layoutSetting.value)
  navigator.clipboard.writeText(settings)
  message.success(t('message.copySuccess'))
}

const handleColorPickerInput = (e) => {
  setThemeColor(e.target.value)
}
</script>

<template>
  <ATooltip :title="t('setting.projectConfig')" :placement="'bottomRight'">
    <SettingOutlined @click="showDrawer" />
  </ATooltip>
  <ADrawer v-model:open="visible" placement="right" :title="t('setting.projectConfig')">
    <ADescriptions :title="t('setting.menuLayout')" :column="5">
      <ADescriptionsItem v-for="item in layouts" :key="item.value">
        <ATooltip :title="t(item.label)">
          <div
            class="style-checkbox-item"
            :class="{ active: layoutSetting.layout === item.value }"
            @click="setLayout(item.value)"
          >
            <svg class="w60px h60px" aria-hidden="true">
              <use :xlink:href="`#svg-icon-${item.value}`" />
            </svg>
          </div>
        </ATooltip>
      </ADescriptionsItem>
    </ADescriptions>
    <ADescriptions :title="t('setting.themeColor')" :column="themeColors.length - 1">
      <ADescriptionsItem v-for="item in themeColors" :key="item.key">
        <div class="style-checkbox-item" v-if="item.tag === 'checkbox'">
          <ATooltip :title="t(item.title)">
            <ATag :color="item.value" @click="setThemeColor(item.value)">
              <span :style="{ visibility: getThemeColorVisible(item.value) }"> ✔ </span>
            </ATag>
          </ATooltip>
        </div>
        <AFlex
          justify="space-between"
          class="w-full flex items-center style-checkbox-item"
          v-if="item.tag === 'input-color'"
        >
          {{ t('setting.customColor') }}
          <ATag :color="colorPrimary" class="relative overflow-hidden">
            <AInput
              type="color"
              class="cursor-pointer absolute top-0 left-0 w-full h-full"
              :style="colorPickerStyle"
              v-model="colorPrimary"
              @input="handleColorPickerInput"
            />
            <span :style="{ visibility: getThemeColorVisible(colorPrimary) }"> ✔ </span>
          </ATag>
        </AFlex>
      </ADescriptionsItem>
    </ADescriptions>
    <ADescriptions :title="t('setting.pageDisplay')" :column="1">
      <ADescriptionsItem v-for="item in uiSettings" :key="item.value">
        <AFlex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'switch'"
        >
          {{ t(item.label) }}
          <ASwitch v-model:checked="layoutSetting[item.value]" />
        </AFlex>
        <AFlex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'input-number'"
        >
          {{ t(item.label) }}
          <AInputNumber
            style="width: 200px"
            v-model:value="layoutSetting[item.value]"
            :min="item.min"
            :max="item.max"
            :addon-after="t(item.unit)"
          />
        </AFlex>
        <AFlex justify="space-between" class="w-full flex items-center" v-if="item.tag === 'input'">
          {{ t(item.label) }}
          <AInput style="width: 200px" v-model:value="layoutSetting[item.value]" />
        </AFlex>
        <AFlex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'select'"
        >
          {{ t(item.label) }}
          <ASelect
            style="width: 200px"
            v-if="item.value === 'animation'"
            v-model:value="layoutSetting.animation"
          >
            <ASelectOption v-for="val in animations" :key="val.animation">
              {{ t(val.name) }}
            </ASelectOption>
          </ASelect>
          <ASelect
            style="width: 200px"
            v-else-if="item.value === 'animationDirection'"
            v-model:value="layoutSetting.animationDirection"
          >
            <ASelectOption
              v-for="val in animations.find((i) => i.animation === layoutSetting.animation).options"
              :key="val"
            >
              {{ val }}
            </ASelectOption>
          </ASelect>
          <ASelect v-else style="width: 200px" v-model:value="layoutSetting[item.value]">
            <ASelectOption v-for="val in item.options" :key="val.value" :value="val.value">
              {{ t(val.label) }}
            </ASelectOption>
          </ASelect>
        </AFlex>
        <AFlex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'segmented'"
        >
          {{ t(item.label) }}
          <ASegmented
            v-model:value="layoutSetting[item.value]"
            :options="
              item.options.map((option) => ({
                value: option.value,
                label: t(option.label),
              }))
            "
          />
        </AFlex>
      </ADescriptionsItem>
    </ADescriptions>
    <template #footer>
      <div class="flex-ac">
        <AButton class="w-45%" type="primary" @click="copySettings">
          {{ t('setting.copy') }}
        </AButton>
        <AButton class="w-45%" type="primary" danger @click="systemStore.clearCacheReload">
          {{ t('setting.clearCacheAndReset') }}
        </AButton>
      </div>
    </template>
  </ADrawer>
</template>

<style lang="less" scoped>
.style-checkbox-item {
  position: relative;
  cursor: pointer;
  &.active::after {
    content: '✔';
    position: absolute;
    right: 12px;
    bottom: 10px;
  }
}
input[type='color'] {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  outline: none;
  appearance: none;
  &::-webkit-color-swatch-wrapper {
    background: var(--custom-color);
  }
  &::-webkit-color-swatch {
    display: none;
  }
}
</style>

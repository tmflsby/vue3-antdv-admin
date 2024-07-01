<script setup>
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import {
  layouts,
  themeColors,
  // themeAlgorithm,
  uiSettings,
  animations
} from '@/settings/layoutTheme.js'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import { useSystemStore } from '@/store/layout/system.js'

const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = computed(() => layoutThemeStore.layoutSetting)
const colorPrimary = computed(() => layoutThemeStore.layoutSetting.colorPrimary)
const colorPickerStyle = computed(() => ({ '--custom-color': colorPrimary.value }))

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
  message.success('复制成功')
}

const handleColorPickerInput = (e) => {
  setThemeColor(e.target.value)
}
</script>

<template>
  <a-tooltip title="项目配置">
    <SettingOutlined @click="showDrawer" />
  </a-tooltip>
  <a-drawer v-model:open="visible" placement="right" title="项目配置">
    <a-descriptions title="导航布局" :column="5">
      <a-descriptions-item v-for="item in layouts" :key="item.value">
        <a-tooltip :title="item.label">
          <div
            class="style-checkbox-item"
            :class="{ active: layoutSetting.layout === item.value }"
            @click="setLayout(item.value)"
          >
            <svg class="w60px h60px" aria-hidden="true">
              <use :xlink:href="`#svg-icon-${item.value}`" />
            </svg>
          </div>
        </a-tooltip>
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="主题色" :column="themeColors.length - 1">
      <a-descriptions-item v-for="item in themeColors" :key="item.key">
        <div class="style-checkbox-item" v-if="item.tag === 'checkbox'">
          <a-tooltip :title="item.title">
            <a-tag :color="item.value" @click="setThemeColor(item.value)">
              <span :style="{ visibility: getThemeColorVisible(item.value) }"> ✔ </span>
            </a-tag>
          </a-tooltip>
        </div>
        <a-flex
          justify="space-between"
          class="w-full flex items-center style-checkbox-item"
          v-if="item.tag === 'input-color'"
        >
          自定义
          <a-tag :color="colorPrimary" class="relative overflow-hidden">
            <a-input
              type="color"
              class="cursor-pointer absolute top-0 left-0 w-full h-full"
              :style="colorPickerStyle"
              v-model="colorPrimary"
              @input="handleColorPickerInput"
            />
            <span :style="{ visibility: getThemeColorVisible(colorPrimary) }"> ✔ </span>
          </a-tag>
        </a-flex>
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="页面显示" :column="1">
      <a-descriptions-item v-for="item in uiSettings" :key="item.value">
        <a-flex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'switch'"
        >
          {{ item.label }}
          <a-switch
            v-model:checked="layoutSetting[item.value]"
            checked-children="开"
            un-checked-children="关"
          />
        </a-flex>
        <a-flex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'input-number'"
        >
          {{ item.label }}
          <a-input-number
            style="width: 200px"
            v-model:value="layoutSetting[item.value]"
            :min="item.min"
            :max="item.max"
            :addon-after="item.unit"
          />
        </a-flex>
        <a-flex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'input'"
        >
          {{ item.label }}
          <a-input style="width: 200px" v-model:value="layoutSetting[item.value]" />
        </a-flex>
        <a-flex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'select'"
        >
          {{ item.label }}
          <a-select
            style="width: 200px"
            v-if="item.value === 'animation'"
            v-model:value="layoutSetting.animation"
          >
            <a-select-option v-for="val in animations" :key="val.animation">
              {{ val.name }}
            </a-select-option>
          </a-select>
          <a-select
            style="width: 200px"
            v-if="item.value === 'animationDirection'"
            v-model:value="layoutSetting.animationDirection"
          >
            <a-select-option
              v-for="val in animations.find((i) => i.animation === layoutSetting.animation).options"
              :key="val"
            >
              {{ val }}
            </a-select-option>
          </a-select>
        </a-flex>
        <a-flex
          justify="space-between"
          class="w-full flex items-center"
          v-if="item.tag === 'segmented'"
        >
          {{ item.label }}
          <a-segmented
            style="width: 200px"
            v-model:value="layoutSetting[item.value]"
            :block="true"
            :options="item.options"
          />
        </a-flex>
      </a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <div class="flex-ac">
        <a-button class="w-45%" type="primary" @click="copySettings">拷贝</a-button>
        <a-button class="w-45%" type="primary" danger @click="systemStore.clearCacheReload">
          清空缓存并重置
        </a-button>
      </div>
    </template>
  </a-drawer>
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

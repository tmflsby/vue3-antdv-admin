import { setupAntDesignVue } from '@/plugins/ant-design-vue'
import { setupUnoCSS } from '@/plugins/unocss'
import { setupSvg } from '@/plugins/svg'
import { setupNProgress } from '@/plugins/nprogress'
import { setupAnimate } from '@/plugins/animate'
import { setupStyle } from '@/plugins/style'

export const setupPlugins = (app) => {
  setupAntDesignVue(app)
  setupUnoCSS()
  setupSvg()
  setupNProgress()
  setupAnimate()
  setupStyle()
}

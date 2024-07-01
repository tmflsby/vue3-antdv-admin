/** 主题风格--风格算法 */
export const themeAlgorithmOptions = [
  {
    label: '明亮',
    value: 'defaultAlgorithm'
  },
  {
    label: '暗黑',
    value: 'darkAlgorithm'
  },
  {
    label: '紧凑',
    value: 'compactAlgorithm'
  }
]

/** 菜单主题 */
export const menuThemeOptions = [
  {
    label: '亮色',
    value: 'light'
  },
  {
    label: '暗色',
    value: 'dark'
  }
]

/** 导航模式（布局方式） */
export const layouts = [
  {
    label: '侧边导航',
    value: 'sidemenu'
  },
  {
    label: '顶部导航',
    value: 'topmenu'
  },
  {
    label: '混合导航',
    value: 'mixinmenu'
  }
]

/** 主题色 */
export const themeColors = [
  {
    title: '拂晓蓝（默认）',
    key: 'techBlue',
    value: '#1677FF',
    tag: 'checkbox'
  },
  {
    title: '薄暮',
    key: 'dust',
    value: '#F5222D',
    tag: 'checkbox'
  },
  {
    title: '火山',
    key: 'volcano',
    value: '#FA541C',
    tag: 'checkbox'
  },
  {
    title: '日暮',
    key: 'sunset',
    value: '#FAAD14',
    tag: 'checkbox'
  },
  {
    title: '明青',
    key: 'cyan',
    value: '#13C2C2',
    tag: 'checkbox'
  },
  {
    title: '极光绿',
    key: 'green',
    value: '#52C41A',
    tag: 'checkbox'
  },
  {
    title: '极客蓝',
    key: 'geekblue',
    value: '#2F54EB',
    tag: 'checkbox'
  },
  {
    title: '酱紫',
    key: 'purple',
    value: '#722ED1',
    tag: 'checkbox'
  },
  {
    title: '自定义',
    key: 'custom',
    value: '',
    tag: 'input-color'
  }
]

/** 页面切换动画 */
export const animations = [
  { animation: 'back', name: '渐进', options: ['Down', 'Left', 'Right', 'Up'] },
  { animation: 'bounce', name: '弹跳', options: ['Default', 'Down', 'Left', 'Right', 'Up'] },
  {
    animation: 'fade',
    name: '淡化',
    options: [
      'Default',
      'Down',
      'DownBig',
      'Left',
      'LeftBig',
      'Right',
      'RightBig',
      'Up',
      'UpBig',
      'TopLeft',
      'TopRight',
      'BottomLeft',
      'BottomRight'
    ]
  },
  { animation: 'flip', name: '翻转', options: ['X', 'Y'] },
  { animation: 'lightSpeed', name: '光速', options: ['Right', 'Left'] },
  {
    animation: 'rotate',
    name: '旋转',
    options: ['Default', 'DownLeft', 'DownRight', 'UpLeft', 'UpRight']
  },
  { animation: 'roll', name: '翻滚', options: ['Default'] },
  { animation: 'zoom', name: '缩放', options: ['Default', 'Down', 'Left', 'Right', 'Up'] },
  { animation: 'slide', name: '滑动', options: ['Down', 'Left', 'Right', 'Up'] }
]

/** 水印区域 */
export const watermarkAreaOptions = [
  {
    label: '全部区域',
    value: 'all'
  },
  {
    label: '内容区域',
    value: 'content'
  }
]

/** 界面显示相关 */
export const uiSettings = [
  {
    label: '系统名称',
    value: 'title',
    tag: 'input'
  },
  {
    label: '主题风格',
    value: 'algorithm',
    tag: 'segmented',
    options: themeAlgorithmOptions
  },
  {
    label: '菜单主题',
    value: 'menuTheme',
    tag: 'segmented',
    options: menuThemeOptions
  },
  {
    label: '菜单宽度',
    value: 'sidemenuWidth',
    tag: 'input-number',
    min: 200,
    max: 350,
    unit: 'px'
  },
  {
    label: '页头（顶栏）主题跟随菜单',
    value: 'navThemeFollowMenu',
    tag: 'switch'
  },
  {
    label: '全屏内容',
    value: 'onlyShowContent',
    tag: 'switch'
  },
  {
    label: '灰色模式',
    value: 'grayMode',
    tag: 'switch'
  },
  {
    label: '色弱模式',
    value: 'colorWeak',
    tag: 'switch'
  },
  {
    label: 'Logo标题',
    value: 'showTitle',
    tag: 'switch'
  },
  {
    label: '页头（顶栏）',
    value: 'showHeader',
    tag: 'switch'
  },
  {
    label: '页脚',
    value: 'showFooter',
    tag: 'switch'
  },
  {
    label: '版权信息',
    value: 'copyright',
    tag: 'input'
  },
  {
    label: '标签页',
    value: 'showTabs',
    tag: 'switch'
  },
  {
    label: '标签图标',
    value: 'tabsIcon',
    tag: 'switch'
  },
  {
    label: '标签持久化',
    value: 'cacheTabs',
    tag: 'switch'
  },
  {
    label: '进度条',
    value: 'showProgress',
    tag: 'switch'
  },
  {
    label: '面包屑',
    value: 'showBreadcrumb',
    tag: 'switch'
  },
  {
    label: '设置',
    value: 'showSetting',
    tag: 'switch'
  },
  {
    label: '全屏',
    value: 'showFullScreen',
    tag: 'switch'
  },
  {
    label: '菜单搜索',
    value: 'showSearchMenu',
    tag: 'switch'
  },
  {
    label: '刷新重置',
    value: 'showRefreshReset',
    tag: 'switch'
  },
  {
    label: '锁屏',
    value: 'showLockScreen',
    tag: 'switch'
  },
  {
    label: '锁屏时间',
    value: 'lockScreenTime',
    tag: 'input-number',
    min: 1,
    max: 24,
    unit: '小时'
  },
  {
    label: '圆角',
    value: 'borderRadius',
    tag: 'input-number',
    min: 0,
    max: 20,
    unit: 'px'
  },
  {
    label: '页面动画',
    value: 'showAnimation',
    tag: 'switch'
  },
  {
    label: '动画效果',
    value: 'animation',
    tag: 'select'
  },
  {
    label: '动画方向',
    value: 'animationDirection',
    tag: 'select'
  },
  {
    label: '水印',
    value: 'watermark',
    tag: 'switch'
  },
  {
    label: '水印区域',
    value: 'watermarkArea',
    tag: 'segmented',
    options: watermarkAreaOptions
  },
  {
    label: '水印文字',
    value: 'watermarkText',
    tag: 'input'
  }
]

/**algorithm
 * 默认配置
 * 修改后要清除 localStorage secessionStorage 才能生效
 * */
export const defaultSettings = {
  layout: 'sidemenu',
  title: 'IKUN❤',
  copyright: 'IKUN❤工作室',
  algorithm: 'defaultAlgorithm',
  menuTheme: 'light',
  sidemenuWidth: 220,
  navThemeFollowMenu: false,
  colorPrimary: '#1677FF',
  onlyShowContent: false,
  grayMode: false,
  colorWeak: false,
  showTitle: true,
  showHeader: true,
  showFooter: true,
  showBreadcrumb: true,
  showSetting: true,
  showFullScreen: true,
  showSearchMenu: true,
  showClearCache: true,
  showRefreshReset: true,
  showLockScreen: true,
  lockScreenTime: 3, // 单位：小时
  showTabs: true,
  cacheTabs: true,
  tabsIcon: true,
  showProgress: true,
  borderRadius: 6,
  showAnimation: true,
  animation: 'back',
  animationDirection: 'Down',
  watermark: false,
  watermarkArea: 'all',
  watermarkText: '🐥你太美，👶👶'
}

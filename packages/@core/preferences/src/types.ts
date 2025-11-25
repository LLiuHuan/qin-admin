import type {
  AccessModeType,
  AuthPageLayoutType,
  BreadcrumbStyleType,
  BuiltinThemeType,
  ContentCompactType,
  DeepPartial,
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  LoginExpiredModeType,
  NavigationStyleType,
  PageTransitionType,
  PreferencesButtonPositionType,
  TabsStyleType,
  ThemeModeType,
} from '@qin-core/typings';

type SupportedLanguagesType = 'en-US' | 'zh-CN';

interface AppPreferences {
  /**
   * @zh_CN 权限模式
   */
  accessMode: AccessModeType;
  /**
   * @zh_CN 登录注册页面布局
   */
  authPageLayout: AuthPageLayoutType;
  /**
   * @zh_CN 检查更新轮询时间
   */
  checkUpdatesInterval: number;
  /**
   * @zh_CN 是否开启灰色模式
   */
  colorGrayMode: boolean;
  /**
   * @zh_CN 是否开启色弱模式
   */
  colorWeakMode: boolean;
  /**
   * @zh_CN 是否开启紧凑模式
   */
  compact: boolean;
  /**
   * @zh_CN 是否开启内容紧凑模式
   */
  contentCompact: ContentCompactType;
  /**
   * @zh_CN 内容紧凑宽度
   */
  contentCompactWidth: number;
  /**
   * @zh_CN 内容内边距
   */
  contentPadding: number;
  /**
   * @zh_CN 内容底部内边距
   */
  contentPaddingBottom: number;
  /**
   * @zh_CN 内容左侧内边距
   */
  contentPaddingLeft: number;
  /**
   * @zh_CN 内容右侧内边距
   */
  contentPaddingRight: number;
  /**
   * @zh_CN 内容顶部内边距
   */
  contentPaddingTop: number;
  /**
   * @zh_CN 应用默认头像
   */
  defaultAvatar: string;
  /**
   * @zh_CN 默认首页地址
   */
  defaultHomePath: string;
  /**
   * @zh_CN 开启动态标题
   */
  dynamicTitle: boolean;
  /**
   * @zh_CN 是否开启检查更新
   */
  enableCheckUpdates: boolean;
  /**
   * @zh_CN 是否显示偏好设置
   */
  enablePreferences: boolean;
  /**
   * @zh_CN 是否开启refreshToken
   */
  enableRefreshToken: boolean;
  /**
   * @zh_CN 是否开启首选项导航栏吸顶效果
   */
  enableStickyPreferencesNavigationBar: boolean;
  /**
   * @zh_CN 是否移动端
   */
  isMobile: boolean;
  /**
   * @zh_CN 布局方式
   */
  layout: LayoutType;
  /**
   * @zh_CN 支持的语言
   */
  locale: SupportedLanguagesType;
  /**
   * @zh_CN 登录过期模式
   */
  loginExpiredMode: LoginExpiredModeType;
  /**
   * @zh_CN 应用名
   */
  name: string;
  /**
   * @zh_CN 偏好设置按钮位置
   */
  preferencesButtonPosition: PreferencesButtonPositionType;
  /**
   * @zh_CN 是否开启水印
   */
  watermark: boolean;
  /**
   * @zh_CN 水印文案
   */
  watermarkContent: string;
  /**
   * @zh_CN z-index
   */
  zIndex: number;
}

interface BreadcrumbPreferences {
  /**
   * @zh_CN 面包屑是否启用
   */
  enable: boolean;
  /**
   * @zh_CN 面包屑是否只有一个时隐藏
   */
  hideOnlyOne: boolean;
  /**
   * @zh_CN 面包屑首页图标是否可见
   */
  showHome: boolean;
  /**
   * @zh_CN 面包屑图标是否可见
   */
  showIcon: boolean;
  /**
   * @zh_CN 面包屑风格
   */
  styleType: BreadcrumbStyleType;
}

interface CopyrightPreferences {
  /**
   * @zh_CN 版权公司名
   */
  companyName: string;
  /**
   * @zh_CN 版权公司名链接
   */
  companySiteLink: string;
  /**
   * @zh_CN 版权日期
   */
  date: string;
  /**
   * @zh_CN 版权是否可见
   */
  enable: boolean;
  /**
   * @zh_CN 备案号
   */
  icp: string;
  /**
   * @zh_CN 备案号链接
   */
  icpLink: string;
  /**
   * @zh_CN 设置面板是否显示
   */
  settingShow?: boolean;
}

interface FooterPreferences {
  /**
   * @zh_CN 底栏是否可见
   */
  enable: boolean;
  /**
   * @zh_CN 底栏是否固定
   */
  fixed: boolean;
  /**
   * @zh_CN 底栏高度
   */
  height: number;
}

interface HeaderPreferences {
  /**
   * @zh_CN 顶栏是否启用
   */
  enable: boolean;
  /**
   * @zh_CN 顶栏高度
   */
  height: number;
  /**
   * @zh_CN 顶栏是否隐藏,css-隐藏
   */
  hidden: boolean;
  /**
   * @zh_CN 顶栏菜单位置
   */
  menuAlign: LayoutHeaderMenuAlignType;
  /**
   * @zh_CN header显示模式
   */
  mode: LayoutHeaderModeType;
}

interface LogoPreferences {
  /**
   * @zh_CN logo是否可见
   */
  enable: boolean;
  /**
   * @zh_CN logo图片适应方式
   */
  fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * @zh_CN logo地址
   */
  source: string;
  /**
   * @zh_CN 暗色主题logo地址 (可选，若不设置则使用 source)
   */
  sourceDark?: string;
}

interface NavigationPreferences {
  /**
   * @zh_CN 导航菜单手风琴模式
   */
  accordion: boolean;
  /**
   * @zh_CN 导航菜单是否切割，只在 layout=mixed-nav 生效
   */
  split: boolean;
  /**
   * @zh_CN 导航菜单风格
   */
  styleType: NavigationStyleType;
}

interface SidebarPreferences {
  /**
   * @zh_CN 点击目录时自动激活子菜单
   */
  autoActivateChild: boolean;
  /**
   * @zh_CN 侧边栏是否折叠
   */
  collapsed: boolean;
  /**
   * @zh_CN 侧边栏折叠按钮是否可见
   */
  collapsedButton: boolean;
  /**
   * @zh_CN 侧边栏折叠时，是否显示title
   */
  collapsedShowTitle: boolean;
  /**
   * @zh_CN 侧边栏折叠宽度
   */
  collapseWidth: number;
  /**
   * @zh_CN 侧边栏是否可见
   */
  enable: boolean;
  /**
   * @zh_CN 菜单自动展开状态
   */
  expandOnHover: boolean;
  /**
   * @zh_CN 侧边栏扩展区域是否折叠
   */
  extraCollapse: boolean;
  /**
   * @zh_CN 侧边栏扩展区域折叠宽度
   */
  extraCollapsedWidth: number;
  /**
   * @zh_CN 侧边栏固定按钮是否可见
   */
  fixedButton: boolean;
  /**
   * @zh_CN 侧边栏是否隐藏 - css
   */
  hidden: boolean;
  /**
   * @zh_CN 混合侧边栏宽度
   */
  mixedWidth: number;
  /**
   * @zh_CN 侧边栏宽度
   */
  width: number;
}

interface ShortcutKeyPreferences {
  /**
   * @zh_CN 是否启用快捷键-全局
   */
  enable: boolean;
  /**
   * @zh_CN 是否启用全局锁屏快捷键
   */
  globalLockScreen: boolean;
  /**
   * @zh_CN 是否启用全局注销快捷键
   */
  globalLogout: boolean;
  /**
   * @zh_CN 是否启用全局偏好设置快捷键
   */
  globalPreferences: boolean;
  /**
   * @zh_CN 是否启用全局搜索快捷键
   */
  globalSearch: boolean;
}

interface TabbarPreferences {
  /**
   * @zh_CN 是否开启多标签页拖拽
   */
  draggable: boolean;
  /**
   * @zh_CN 是否开启多标签页
   */
  enable: boolean;
  /**
   * @zh_CN 标签页高度
   */
  height: number;
  /**
   * @zh_CN 开启标签页缓存功能
   */
  keepAlive: boolean;
  /**
   * @zh_CN 限制最大数量
   */
  maxCount: number;
  /**
   * @zh_CN 是否点击中键时关闭标签
   */
  middleClickToClose: boolean;
  /**
   * @zh_CN 是否持久化标签
   */
  persist: boolean;
  /**
   * @zh_CN 是否开启多标签页图标
   */
  showIcon: boolean;
  /**
   * @zh_CN 显示最大化按钮
   */
  showMaximize: boolean;
  /**
   * @zh_CN 显示更多按钮
   */
  showMore: boolean;
  /**
   * @zh_CN 标签页风格
   */
  styleType: TabsStyleType;
  /**
   * @zh_CN 是否开启鼠标滚轮响应
   */
  wheelable: boolean;
}

interface ThemePreferences {
  /**
   * @zh_CN 内置主题名
   */
  builtinType: BuiltinThemeType;
  /**
   * @zh_CN 错误色
   */
  colorDestructive: string;
  /**
   * @zh_CN 主题色
   */
  colorPrimary: string;
  /**
   * @zh_CN 成功色
   */
  colorSuccess: string;
  /**
   * @zh_CN 警告色
   */
  colorWarning: string;
  /** 字体大小（单位：px） */
  fontSize: number;
  /**
   * @zh_CN 当前主题
   */
  mode: ThemeModeType;
  /**
   * @zh_CN 圆角
   */
  radius: string;
  /**
   * @zh_CN 是否开启半深色header（只在theme='light'时生效）
   */
  semiDarkHeader: boolean;
  /**
   * @zh_CN 是否开启半深色菜单（只在theme='light'时生效）
   */
  semiDarkSidebar: boolean;
}

interface TransitionPreferences {
  /**
   * @zh_CN 页面切换动画是否启用
   */
  enable: boolean;
  /**
   * @zh_CN 是否开启页面加载loading
   */
  loading: boolean;
  /**
   * @zh_CN 页面切换动画
   */
  name: PageTransitionType | string;
  /**
   * @zh_CN 是否开启页面加载进度动画
   */
  progress: boolean;
}

interface WidgetPreferences {
  /**
   * @zh_CN 是否启用全屏部件
   */
  fullscreen: boolean;
  /**
   * @zh_CN 是否启用全局搜索部件
   */
  globalSearch: boolean;
  /**
   * @zh_CN 是否启用语言切换部件
   */
  languageToggle: boolean;
  /**
   * @zh_CN 是否开启锁屏功能
   */
  lockScreen: boolean;
  /**
   * @zh_CN 是否显示通知部件
   */
  notification: boolean;
  /**
   * @zh_CN 显示刷新按钮
   */
  refresh: boolean;
  /**
   * @zh_CN 是否显示侧边栏显示/隐藏部件
   */
  sidebarToggle: boolean;
  /**
   * @zh_CN 是否显示主题切换部件
   */
  themeToggle: boolean;
  /**
   * @zh_CN 是否显示时区部件
   */
  timezone: boolean;
}

interface Preferences {
  /**
   * @zh_CN 全局配置
   */
  app: AppPreferences;
  /**
   * @zh_CN 顶栏配置
   */
  breadcrumb: BreadcrumbPreferences;
  /**
   * @zh_CN 版权配置
   */
  copyright: CopyrightPreferences;
  /**
   * @zh_CN 底栏配置
   */
  footer: FooterPreferences;
  /**
   * @zh_CN 面包屑配置
   */
  header: HeaderPreferences;
  /**
   * @zh_CN logo配置
   */
  logo: LogoPreferences;
  /**
   * @zh_CN 导航配置
   */
  navigation: NavigationPreferences;
  /**
   * @zh_CN 快捷键配置
   */
  shortcutKeys: ShortcutKeyPreferences;
  /**
   * @zh_CN 侧边栏配置
   */
  sidebar: SidebarPreferences;
  /**
   * @zh_CN 标签页配置
   */
  tabbar: TabbarPreferences;
  /**
   * @zh_CN 主题配置
   */
  theme: ThemePreferences;
  /**
   * @zh_CN 动画配置
   */
  transition: TransitionPreferences;
  /**
   * @zh_CN 功能配置
   */
  widget: WidgetPreferences;
}

type PreferencesKeys = keyof Preferences;

interface InitialOptions {
  namespace: string;
  overrides?: DeepPartial<Preferences>;
}
export type {
  AppPreferences,
  BreadcrumbPreferences,
  FooterPreferences,
  HeaderPreferences,
  InitialOptions,
  LogoPreferences,
  NavigationPreferences,
  Preferences,
  PreferencesKeys,
  ShortcutKeyPreferences,
  SidebarPreferences,
  SupportedLanguagesType,
  TabbarPreferences,
  ThemePreferences,
  TransitionPreferences,
  WidgetPreferences,
};

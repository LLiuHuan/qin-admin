// 流星对象接口定义
export interface BasicMeteor {
  /** 流星的水平位置(百分比) */
  x: number;
  /** 流星划过的速度 */
  speed: number;
  /** 流星出现的延迟时间 */
  delay: number;
}

// 按钮配置接口定义
export interface BasicButtonConfig {
  /** 是否启用按钮 */
  show: boolean;
  /** 按钮文本 */
  text: string;
  /** 按钮背景色 */
  color?: string;
  /** 按钮文字颜色 */
  textColor?: string;
  /** 按钮圆角大小 */
  radius?: string;
}

// 流星效果配置接口定义
export interface BasicMeteorConfig {
  /** 是否启用流星效果 */
  enabled: boolean;
  /** 流星数量 */
  count?: number;
}

// 背景图片配置接口定义
export interface BasicImageConfig {
  /** 图片源地址 */
  src: string;
  /** 图片宽度 */
  width?: string;
  /** 距底部距离 */
  bottom?: string;
  /** 距右侧距离 */
  right?: string; // 距右侧距离
}

// 组件属性接口定义
export interface BasicPannerProps {
  /** 横幅高度 */
  height?: string;
  /** 标题文本 */
  title?: string;
  /** 副标题文本 */
  subtitle?: string;
  /** 盒子样式 */
  boxStyle?: string;
  /** 是否显示装饰效果 */
  decoration?: boolean;
  /** 按钮配置 */
  buttonConfig?: BasicButtonConfig;
  /** 流星配置 */
  meteorConfig?: BasicMeteorConfig;
  /** 图片配置 */
  imageConfig?: BasicImageConfig;
  /** 标题颜色 */
  titleColor?: string;
  /** 副标题颜色 */
  subtitleColor?: string;
}

export // 定义卡片横幅组件的属性接口
interface CardBannerProps {
  /** 高度 */
  height?: string;
  /** 图片路径 */
  image?: string;
  /** 标题文本 */
  title?: string;
  /** 描述文本 */
  description?: string;
  /** 主按钮配置 */
  button?: {
    /** 背景颜色 */
    color?: string;
    /** 是否显示 */
    show?: boolean;
    /** 按钮文本 */
    text?: string;
    /** 文字颜色 */
    textColor?: string;
  };
  /** 取消按钮配置 */
  cancelButton?: {
    /** 背景颜色 */
    color?: string;
    /** 是否显示 */
    show?: boolean;
    /** 按钮文本 */
    text?: string;
    /** 文字颜色 */
    textColor?: string;
  };
}

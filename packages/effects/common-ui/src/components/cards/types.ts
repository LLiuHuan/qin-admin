export interface StatsCardProps {
  /** 盒子样式 */
  boxStyle?: string;
  /** 图标 */
  icon?: string;
  /** 图标样式 */
  iconStyle?: string;
  /** 标题 */
  title?: string;
  /** 数值 */
  count?: number;
  /** 小数位 */
  decimals?: number;
  /** 分隔符 */
  separator?: string;
  /** 描述 */
  description: string;
  /** 文本颜色 */
  textColor?: string;
  /** 是否显示箭头 */
  showArrow?: boolean;
}

export interface ProgressProps {
  /** 进度百分比 */
  percentage: number;
  /** 标题 */
  title: string;
  /** 颜色 */
  color?: string;
  /** 图标 */
  icon?: string;
  /** 图标样式 */
  iconStyle?: string;
  /** 进度条宽度 */
  strokeWidth?: number;
}

export interface LineChartProps {
  /** 数值 */
  value: number;
  /** 标签 */
  label: string;
  /** 百分比 */
  percentage: number;
  /** 日期 */
  date?: string;
  /** 高度 */
  height?: number;
  /** 颜色 */
  color?: string;
  /** 是否显示区域颜色 */
  showAreaColor?: boolean;
  /** 图表数据 */
  chartData: number[];
  /** 是否为迷你图表 */
  isMiniChart?: boolean;
}

export interface BarChartProps {
  /** 数值 */
  value: number;
  /** 标签 */
  label: string;
  /** 百分比 +（绿色）-（红色） */
  percentage: number;
  /** 日期 */
  date?: string;
  /** 高度 */
  height?: number;
  /** 颜色 */
  color?: string;
  /** 图表数据 */
  chartData: number[];
  /** 柱状图宽度 */
  barWidth?: string;
  /** 是否为迷你图表 */
  isMiniChart?: boolean;
}

export interface DonutProps {
  /** 数值 */
  value: number;
  /** 标题 */
  title: string;
  /** 百分比 */
  percentage: number;
  /** 百分比标签 */
  percentageLabel?: string;
  /** 当前年份 */
  currentValue?: string;
  /** 去年年份 */
  previousValue?: string;
  /** 高度 */
  height?: number;
  /** 颜色 */
  color?: string;
  /** 半径 */
  radius?: [string, string];
  /** 数据 */
  data: [number, number];
}

export interface ImageProps {
  /** 图片地址 */
  imageUrl: string;
  /** 标题 */
  title: string;
  /** 分类 */
  category?: string;
  /** 阅读时间 */
  readTime?: string;
  /** 浏览量 */
  views?: number;
  /** 评论数 */
  comments?: number;
  /** 日期 */
  date?: string;
}

export interface DataListProps {
  /** 数据列表 */
  list: Activity[];
  /** 标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 最大显示数量 */
  maxCount?: number;
  /** 是否显示更多按钮 */
  showMoreButton?: boolean;
}

interface Activity {
  /** 标题 */
  title: string;
  /** 状态 */
  status: string;
  /** 时间 */
  time: string;
  /** 样式类名 */
  class: string;
  /** 图标 */
  icon: string;
}

interface TimelineItem {
  /** 时间 */
  time: string;
  /** 状态颜色 */
  status: string;
  /** 内容 */
  content: string;
  /** 代码标识 */
  code?: string;
}

export interface TimelineProps {
  /** 时间轴列表数据 */
  list: TimelineItem[];
  /** 标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 最大显示数量 */
  maxCount?: number;
}

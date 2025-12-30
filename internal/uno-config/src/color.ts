function createColorsPalette(name: string) {
  // backgroundLightest: '#EFF6FF', // Tailwind CSS 默认的 `blue-50`
  //         backgroundLighter: '#DBEAFE',  // Tailwind CSS 默认的 `blue-100`
  //         backgroundLight: '#BFDBFE',    // Tailwind CSS 默认的 `blue-200`
  //         borderLight: '#93C5FD',        // Tailwind CSS 默认的 `blue-300`
  //         border: '#60A5FA',             // Tailwind CSS 默认的 `blue-400`
  //         main: '#3B82F6',               // Tailwind CSS 默认的 `blue-500`
  //         hover: '#2563EB',              // Tailwind CSS 默认的 `blue-600`
  //         active: '#1D4ED8',             // Tailwind CSS 默认的 `blue-700`
  //         backgroundDark: '#1E40AF',     // Tailwind CSS 默认的 `blue-800`
  //         backgroundDarker: '#1E3A8A',   // Tailwind CSS 默认的 `blue-900`
  //         backgroundDarkest: '#172554',  // Tailwind CSS 默认的 `blue-950`

  // •	backgroundLightest (#EFF6FF): 适用于最浅的背景色，可能用于非常轻微的阴影或卡片的背景。
  // •	backgroundLighter (#DBEAFE): 适用于略浅的背景色，通常用于次要背景或略浅的区域。
  // •	backgroundLight (#BFDBFE): 适用于浅色背景，可能用于输入框或表单区域的背景。
  // •	borderLight (#93C5FD): 适用于浅色边框，可能用于输入框或卡片的边框。
  // •	border (#60A5FA): 适用于普通边框，可能用于按钮或卡片的边框。
  // •	main (#3B82F6): 适用于主要的主题色，通常用于按钮、链接或主要的强调色。
  // •	hover (#2563EB): 适用于鼠标悬停状态下的颜色，例如按钮悬停时的背景色或边框色。
  // •	active (#1D4ED8): 适用于激活状态下的颜色，例如按钮按下时的背景色或边框色。
  // •	backgroundDark (#1E40AF): 适用于深色背景，可能用于主要按钮或深色卡片背景。
  // •	backgroundDarker (#1E3A8A): 适用于更深的背景，通常用于头部导航栏或页脚。
  // •	backgroundDarkest (#172554): 适用于最深的背景，可能用于非常深色的区域或极端对比色。

  return {
    50: `hsl(var(--${name}-50))`,
    100: `hsl(var(--${name}-100))`,
    200: `hsl(var(--${name}-200))`,
    300: `hsl(var(--${name}-300))`,
    400: `hsl(var(--${name}-400))`,
    500: `hsl(var(--${name}-500))`,
    600: `hsl(var(--${name}-600))`,
    700: `hsl(var(--${name}-700))`,
    800: `hsl(var(--${name}-800))`,
    900: `hsl(var(--${name}-900))`,
    950: `hsl(var(--${name}-950))`,
    // 激活状态下的颜色，适用于按钮按下时的背景色或边框色。
    active: `hsl(var(--${name}-700))`,
    // 浅色背景，适用于输入框或表单区域的背景。
    'background-light': `hsl(var(--${name}-200))`,
    // 适用于略浅的背景色，通常用于次要背景或略浅的区域。
    'background-lighter': `hsl(var(--${name}-100))`,
    // 最浅的背景色，适用于非常轻微的阴影或卡片的背景。
    'background-lightest': `hsl(var(--${name}-50))`,
    // 适用于普通边框，可能用于按钮或卡片的边框。
    border: `hsl(var(--${name}-400))`,
    // 浅色边框，适用于输入框或卡片的边框。
    'border-light': `hsl(var(--${name}-300))`,
    foreground: `hsl(var(--${name}-foreground))`,
    // 鼠标悬停状态下的颜色，适用于按钮悬停时的背景色或边框色。
    hover: `hsl(var(--${name}-600))`,
    // 主色文本
    text: `hsl(var(--${name}-500))`,
    // 主色文本激活态
    'text-active': `hsl(var(--${name}-700))`,
    // 主色文本悬浮态
    'text-hover': `hsl(var(--${name}-600))`,
    outline: `hsl(var(--${name}-300))`,
  };
}

export const shadcnUiColors = {
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
    hover: 'hsl(var(--accent-hover))',
    lighter: 'hsl(val(--accent-lighter))',
  },
  background: {
    deep: 'hsl(var(--background-deep))',
    DEFAULT: 'hsl(var(--background))',
  },
  border: {
    DEFAULT: 'hsl(var(--border))',
  },
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))',
  },
  destructive: {
    ...createColorsPalette('destructive'),
    DEFAULT: 'hsl(var(--destructive))',
  },

  foreground: {
    DEFAULT: 'hsl(var(--foreground))',
  },

  input: {
    background: 'hsl(var(--input-background))',
    DEFAULT: 'hsl(var(--input))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  popover: {
    DEFAULT: 'hsl(var(--popover))',
    foreground: 'hsl(var(--popover-foreground))',
  },
  primary: {
    ...createColorsPalette('primary'),
    DEFAULT: 'hsl(var(--primary))',
  },

  ring: 'hsl(var(--ring))',
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    desc: 'hsl(var(--secondary-desc))',
    foreground: 'hsl(var(--secondary-foreground))',
  },
};

export const customColors = {
  green: {
    ...createColorsPalette('green'),
    foreground: 'hsl(var(--success-foreground))',
  },
  header: {
    DEFAULT: 'hsl(var(--header))',
  },
  heavy: {
    DEFAULT: 'hsl(var(--heavy))',
    foreground: 'hsl(var(--heavy-foreground))',
  },
  main: {
    DEFAULT: 'hsl(var(--main))',
  },
  overlay: {
    content: 'hsl(var(--overlay-content))',
    DEFAULT: 'hsl(var(--overlay))',
  },
  red: {
    ...createColorsPalette('red'),
    foreground: 'hsl(var(--destructive-foreground))',
  },
  sidebar: {
    deep: 'hsl(var(--sidebar-deep))',
    DEFAULT: 'hsl(var(--sidebar))',
  },
  success: {
    ...createColorsPalette('success'),
    DEFAULT: 'hsl(var(--success))',
  },
  warning: {
    ...createColorsPalette('warning'),
    DEFAULT: 'hsl(var(--warning))',
  },
  yellow: {
    ...createColorsPalette('yellow'),
    foreground: 'hsl(var(--warning-foreground))',
  },
};

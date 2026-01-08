export const defaultColors = {
  gray: {
    // 50: '#ffffff',
    100: '210 20%  98%',
    200: '200  13%  95%',
    300: '192  11%  91%',
    400: '200  9%  87%',
    500: '223  20%  65%',
    600: '219  18%  55%',
    700: '224  21%  38%',
    800: '240  19%  27%',
    900: '240  24%  26%',
  },
};

export const darkDefaultColors = {
  gray: {
    // 50: '#1f2937',
    100: '0  6%  6%',
    200: '240  10%  10%',
    300: '240  10%  25%',
    400: '240  10%  35%',
    500: '240  10%  50%',
    600: '240  10%  60%',
    700: '240 10%  70%',
    800: '240 10%  80%',
    900: '240 10%  90%',
  },
};

// const themes = {
//   primary: {
//     DEFAULT: 'var(--qin-purple-500)',
//     text: 'var(--qin-light-50)',
//     hover: 'var(--qin-purple-300)',
//     border: 'transparent',
//   },
// };

// const darkThemes = {
//   primary: {
//     DEFAULT: 'var(--qin-purple-400)',
//     text: 'var(--qin-dark-900)',
//     hover: 'var(--qin-purple-600)',
//     border: 'transparent',
//   },
// };

function splitCSSInject(
  prefix: string,
  key: string,
  value: Record<number | string, string>,
) {
  let res = '';
  for (const [k, v] of Object.entries(value)) {
    res +=
      k === 'DEFAULT'
        ? `\n--${prefix}-${key}: ${v};`
        : `\n--${prefix}-${key}-${k}: ${v};`;
  }
  return res;
}

function generateCSSVariables(
  entries: Record<string, any>,
  selector: string,
  prefix: string,
) {
  return Object.entries(entries)
    .map(
      ([key, value]) =>
        `\n${selector}{${splitCSSInject(prefix, key, value)}\n}`,
    )
    .join('');
}

export function getCSSVariable(
  colors = defaultColors,
  darkColors = darkDefaultColors,
  prefix: string = 'qin',
) {
  return [
    generateCSSVariables(colors, ':root', prefix),
    generateCSSVariables(darkColors, 'html.dark', prefix),
    // generateCSSVariables(themes, ':root', prefix),
    // generateCSSVariables(darkThemes, 'html.dark', prefix),
  ].join('');
}

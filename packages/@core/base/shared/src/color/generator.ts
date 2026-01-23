/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-18 13:39:28
 * @LastEditTime: 2026-01-06 15:05:30
 * @LastEditors: LLiuHuan
 */
import { colourBlend, withShade, withTint } from './color';
import { convertToHslCssVar, TinyColor } from './convert';

interface ColorItem {
  alias?: string;
  color: string;
  name: string;
}

const __variants = {
  50: withTint(0.95),
  100: withTint(0.9),
  200: withTint(0.75),
  300: withTint(0.6),
  400: withTint(0.3),
  500: (c: string) => c,
  600: withShade(0.9),
  700: withShade(0.6),
  800: withShade(0.45),
  900: withShade(0.3),
  950: withShade(0.2),
};

function generatorColorVariables(colorItems: ColorItem[]) {
  const colorVariables: Record<string, string> = {};
  colorItems.forEach(({ alias, color, name }) => {
    if (color) {
      const mainColor = convertToHslCssVar(new TinyColor(color).toHexString());
      colorVariables[`--${name}`] = mainColor;

      for (const [variant, fn] of Object.entries(__variants)) {
        const cssVar = convertToHslCssVar(fn(color));
        colorVariables[`--${name}-${variant}`] = cssVar;
        if (alias) {
          colorVariables[`--${alias}-${variant}`] = cssVar;
        }
      }

      // for (const variant of [
      //   50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
      // ]) {
      //   const hexColor = getLightColor(
      //     new TinyColor(color).toHexString(),
      //     variant / 1000,
      //     isDark,
      //   );

      //   const hslColor = convertToHslCssVar(hexColor);
      //   colorVariables[`--${name}-${variant}`] = hslColor;
      //   if (alias) {
      //     colorVariables[`--${alias}-${variant}`] = hslColor;
      //   }
      // }

      if (name === 'primary') {
        const mixColor = '#ffffff';
        // 生成更淡一点的颜色
        for (let i = 1; i < 16; i++) {
          const itemColor = colourBlend(color, mixColor, i / 16);
          colorVariables[`--${name}-custom-${i * 100}`] = itemColor;
        }
      }

      if (alias && mainColor) {
        colorVariables[`--${alias}`] = mainColor;
      }
    }
  });
  return colorVariables;
}

export { generatorColorVariables };

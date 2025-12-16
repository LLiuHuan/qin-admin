import { colourBlend, getLightColor } from './color';
import { convertToHslCssVar, TinyColor } from './convert';

interface ColorItem {
  alias?: string;
  color: string;
  name: string;
}

function generatorColorVariables(colorItems: ColorItem[], isDark: boolean) {
  const colorVariables: Record<string, string> = {};
  colorItems.forEach(({ alias, color, name }) => {
    if (color) {
      const mainColor = convertToHslCssVar(new TinyColor(color).toHexString());
      colorVariables[`--${name}`] = mainColor;

      for (let i = 1; i <= 9; i++) {
        const hexColor = getLightColor(
          new TinyColor(color).toHexString(),
          i / 10,
          isDark,
        );
        const hslColor = convertToHslCssVar(hexColor);
        colorVariables[`--${name}-${i * 100}`] = hslColor;
        if (alias) {
          colorVariables[`--${alias}-${i * 100}`] = hslColor;
        }
      }

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

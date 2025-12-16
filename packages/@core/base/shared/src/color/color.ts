import { TinyColor } from '@ctrl/tinycolor';

import { isValidColor } from './convert';

/**
 * 判断颜色是否为暗色
 * @param color 颜色值
 * @returns 颜色是否为暗色
 */
export function isDarkColor(color: string) {
  return new TinyColor(color).isDark();
}

/**
 * 判断颜色是否为亮色
 * @param color 颜色值
 * @returns 颜色是否为亮色
 */
export function isLightColor(color: string) {
  return new TinyColor(color).isLight();
}

/**
 * 获取CSS变量值（别名函数）
 * @param name CSS变量名
 * @returns CSS变量值
 */
export function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

/**
 * 颜色混合
 * @param color1 第一个颜色
 * @param color2 第二个颜色
 * @param ratio 混合比例 (0-1)
 * @returns 混合后的颜色
 */
export function colourBlend(
  color1: string,
  color2: string,
  ratio: number,
): string {
  const validRatio = Math.max(0, Math.min(1, Number(ratio)));

  const tc1 = new TinyColor(color1);
  const { r: r1, g: g1, b: b1 } = tc1.toRgb();

  const tc2 = new TinyColor(color2);
  const { r: r2, g: g2, b: b2 } = tc2.toRgb();

  const lightenValue = (v1: number, v2: number) =>
    Math.round(v1 * (1 - validRatio) + v2 * validRatio);

  return new TinyColor({
    r: lightenValue(r1, r2),
    g: lightenValue(g1, g2),
    b: lightenValue(b1, b2),
  }).toHexString();
}

/**
 * 获取变浅的颜色
 * @param color 原始颜色
 * @param level 变浅程度 (0-1)
 * @param isDark 是否为暗色主题
 * @returns 变浅后的颜色
 */
export function getLightColor(
  color: string,
  level: number,
  isDark: boolean = false,
): string {
  if (!isValidColor(color)) {
    throw new Error('Invalid hex color format');
  }

  if (isDark) {
    return getDarkColor(color, level);
  }

  const tc = new TinyColor(color);
  const { r, g, b } = tc.toRgb();

  const lightenValue = (v: number) => Math.floor((255 - v) * level + v);

  return new TinyColor({
    r: lightenValue(r),
    g: lightenValue(g),
    b: lightenValue(b),
  }).toHexString();
}

/**
 * 获取变深的颜色
 * @param color 原始颜色
 * @param level 变深程度 (0-1)
 * @returns 变深后的颜色
 */
export function getDarkColor(color: string, level: number): string {
  if (!isValidColor(color)) {
    throw new Error('Invalid hex color format');
  }

  const tc = new TinyColor(color);
  const { r, g, b } = tc.toRgb();

  const lightenValue = (v: number) => Math.floor(v * (1 - level));

  return new TinyColor({
    r: lightenValue(r),
    g: lightenValue(g),
    b: lightenValue(b),
  }).toHexString();
}

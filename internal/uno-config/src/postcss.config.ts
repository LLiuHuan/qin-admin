/*
 * @Description: postcss 配置文件
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:36:16
 * @LastEditTime: 2026-01-22 22:14:50
 * @LastEditors: LLiuHuan
 */
import unoPostcss from '@unocss/postcss';
import postcssAntdFixes from 'postcss-antd-fixes';

export default {
  plugins: [
    ...(process.env.NODE_ENV === 'production' ? [{ cssnano: {} }] : []),
    postcssAntdFixes({ prefixes: ['ant', 'el'] }),
    unoPostcss(),
    // 以下是你注释的插件，如需启用，建议也用显式导入方式
    // { 'postcss-import': {} },
    // { 'postcss-preset-env': {} },
    // {
    //   'postcss-pxtorem': {
    //     rootValue: 192,
    //     propList: ['*'],
    //     minPixelValue: 2,
    //   },
    // },
  ],
};

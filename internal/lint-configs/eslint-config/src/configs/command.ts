/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2025-11-24 15:01:59
 * @LastEditors: LLiuHuan
 */
import createCommand from 'eslint-plugin-command/config';

export async function command() {
  return [
    {
      ...createCommand(),
    },
  ];
}

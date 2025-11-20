import type { ISpec, ITheme } from '@visactor/vchart';

import { effectScope, onScopeDispose, ref, watch } from 'vue';

import { usePreferences } from '@qin/preferences';

import VChart, { registerLiquidChart } from '@visactor/vchart';
import dark from '@visactor/vchart-theme/public/dark.json';
import light from '@visactor/vchart-theme/public/light.json';
import { useElementSize } from '@vueuse/core';

registerLiquidChart();

// 注册主题
VChart.ThemeManager.registerTheme('light', light as ITheme);
VChart.ThemeManager.registerTheme('dark', dark as ITheme);

interface ChartHooks {
  onRender?: (chart: VChart) => Promise<void> | void;
  onUpdated?: (chart: VChart) => Promise<void> | void;
  onDestroy?: (chart: VChart) => Promise<void> | void;
}

export function useVChart<T extends ISpec>(
  specFactory: () => T,
  hooks: ChartHooks = {},
) {
  const scope = effectScope();
  const { isDark } = usePreferences();

  const domRef = ref<HTMLElement | null>(null);
  const initialSize = { width: 0, height: 0 };
  const { width, height } = useElementSize(domRef, initialSize);

  let chart: null | VChart = null;
  const spec: T = specFactory();

  const { onRender, onUpdated, onDestroy } = hooks;

  /**
   * 是否可以渲染图表
   *
   * 当domRef存在并且initialSize有效时
   */
  function canRender() {
    return domRef.value && initialSize.width > 0 && initialSize.height > 0;
  }

  /** 是否渲染图表 */
  function isRendered() {
    return Boolean(domRef.value && chart);
  }

  /**
   * 更新图表 spec
   *
   * @param callback 回调函数
   */
  async function updateSpec(
    callback: (opts: T, optsFactory: () => T) => ISpec = () => spec,
  ) {
    if (!isRendered()) return;

    const updatedOpts = callback(spec, specFactory);

    Object.assign(spec, updatedOpts);

    if (isRendered()) {
      chart?.release();
    }

    chart?.updateSpec({ ...updatedOpts }, true);

    if (chart) {
      await onUpdated?.(chart);
    }
  }

  function setSpec(newSpec: T) {
    chart?.updateSpec(newSpec);
  }

  /** 渲染图表 */
  async function render() {
    if (!isRendered()) {
      // 设置主题
      VChart.ThemeManager.setCurrentTheme(isDark.value ? 'dark' : 'light');

      chart = new VChart(spec, { dom: domRef.value as HTMLElement });
      chart.renderSync();

      if (onRender) await onRender?.(chart);
    }
  }

  /** 调整图表大小 */
  function resize() {
    // chart?.resize();
  }

  /** 销毁图表 */
  async function destroy() {
    if (!chart) return;

    await onDestroy?.(chart);
    chart?.release();
    chart = null;
  }

  /** 更新图表主题 */
  async function changeTheme() {
    await destroy();
    await render();
    if (chart) await onUpdated?.(chart);
  }

  /**
   * 更新图表大小
   *
   * @param w width
   * @param h height
   */
  async function renderChartBySize(w: number, h: number) {
    initialSize.width = w;
    initialSize.height = h;

    // 大小异常，销毁图表
    if (!canRender()) {
      await destroy();

      return;
    }

    // 调整图表大小
    if (isRendered()) {
      resize();
    }

    // 渲染图表
    await render();
  }

  scope.run(() => {
    watch([width, height], ([newWidth, newHeight]) => {
      renderChartBySize(newWidth, newHeight);
    });

    watch(isDark, () => {
      changeTheme();
    });
  });

  onScopeDispose(() => {
    destroy();
    scope.stop();
  });

  return {
    domRef,
    updateSpec,
    setSpec,
  };
}

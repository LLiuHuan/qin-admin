import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  PictorialBarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption,
  TreemapSeriesOption,
} from 'echarts/charts';
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components';

import { effectScope, nextTick, onScopeDispose, ref, watch } from 'vue';

import { usePreferences } from '@qin/preferences';

import { useElementSize } from '@vueuse/core';
import {
  BarChart,
  GaugeChart,
  LineChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
  ScatterChart,
  TreemapChart,
} from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | DatasetComponentOption
  | GaugeSeriesOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | PictorialBarSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | ScatterSeriesOption
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | TreemapSeriesOption
>;

echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  PictorialBarChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  TreemapChart,
]);

interface ChartHooks {
  onRender?: (chart: echarts.ECharts) => Promise<void> | void;
  onUpdated?: (chart: echarts.ECharts) => Promise<void> | void;
  onDestroy?: (chart: echarts.ECharts) => Promise<void> | void;
}

/**
 * use echarts
 *
 * @param optionsFactory echarts 工厂函数
 * @param hooks 钩子函数
 */
export function useEcharts<T extends ECOption>(
  optionsFactory: () => T,
  hooks: ChartHooks = {},
) {
  const scope = effectScope();

  const { isDark } = usePreferences();

  const domRef = ref<HTMLElement | null>(null);
  const initialSize = { width: 0, height: 0 };
  const { width, height } = useElementSize(domRef, initialSize);

  let chart: echarts.ECharts | null = null;
  const chartOptions: T = optionsFactory();

  const {
    onRender = (instance) => {
      const textColor = isDark.value ? 'rgb(224, 224, 224)' : 'rgb(31, 31, 31)';
      const maskColor = isDark.value
        ? 'rgba(0, 0, 0, 0.4)'
        : 'rgba(255, 255, 255, 0.8)';

      instance.showLoading({
        textColor,
        fontSize: 14,
        maskColor,
      });
    },
    onUpdated = (instance) => {
      instance.hideLoading();
    },
    onDestroy,
  } = hooks;

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
   * 更新图表options
   *
   * @param callback 回调函数
   */
  async function updateOptions(
    callback: (opts: T, optsFactory: () => T) => ECOption = () => chartOptions,
  ) {
    if (!isRendered()) return;

    const updatedOpts = callback(chartOptions, optionsFactory);

    Object.assign(chartOptions, updatedOpts);

    if (isRendered()) {
      chart?.clear();
    }

    chart?.setOption({ ...updatedOpts, backgroundColor: 'transparent' });

    if (chart) await onUpdated?.(chart);
  }

  function setOptions(options: T) {
    chart?.setOption(options);
  }

  /** 渲染图表 */
  async function render() {
    if (!isRendered()) {
      const chartTheme = isDark.value ? 'dark' : 'light';

      await nextTick();

      chart = echarts.init(domRef.value, chartTheme);

      chart.setOption({ ...chartOptions, backgroundColor: 'transparent' });

      await onRender?.(chart);
    }
  }

  /** 调整图表大小 */
  function resize() {
    chart?.resize();
  }

  /** 销毁图表 */
  async function destroy() {
    if (!chart) return;

    await onDestroy?.(chart);
    chart?.dispose();
    chart = null;
  }

  /** 更改图表主题 */
  async function changeTheme() {
    await destroy();
    await render();
    if (chart) await onUpdated?.(chart);
  }

  /**
   * 按大小渲染图表
   *
   * @param w width
   * @param h height
   */
  async function renderChartBySize(w: number, h: number) {
    initialSize.width = w;
    initialSize.height = h;

    // 图表异常，销毁图表
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

    if (chart) {
      await onUpdated?.(chart);
    }
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
    updateOptions,
    setOptions,
  };
}

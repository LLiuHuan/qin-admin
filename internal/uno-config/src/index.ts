/*
 * @Description: unocss配置
 * @Author: LLiuHuan
 * @Date: 2025-05-07 16:16:41
 * @LastEditTime: 2025-06-13 17:22:14
 * @LastEditors: LLiuHuan
 */

import path from 'node:path';

import { getPackagesSync } from '@manypkg/get-packages';
// import { createRemToPxProcessor } from '@unocss/preset-wind4/utils';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetAnimations } from 'unocss-preset-animations';

import { customColors, shadcnUiColors } from './color';
import { getCSSVariable } from './preflights';
// import { presetShadcn } from 'unocss-preset-shadcn';

// const BASE_FONT_SIZE = 4;

const { packages } = getPackagesSync(process.cwd());

const tailwindPackages: string[] = [];

packages.forEach((pkg) => {
  // apps目录下和 @qin-core/tailwind-ui 包需要使用到 tailwindcss ui
  // if (fs.existsSync(path.join(pkg.dir, 'tailwind.config.mjs'))) {
  tailwindPackages.push(pkg.dir);
  // }
});

export default defineConfig({
  presets: [
    presetWind3({
      dark: 'class',
      respectPrefix: true,
      preflights: {
        // reset: true,
        // theme: true,
        // theme: {
        //   process: createRemToPxProcessor(BASE_FONT_SIZE),
        // },
      },
    }),
    presetAnimations(),
    // presetShadcn(
    //   {},
    //   {
    //     componentLibrary: 'reka',
    //   },
    // ),
    presetAttributify(),
    presetIcons({
      // prefix: 'i-',
      // scale: 1.2,
      // warn: true,
      // extraProperties: {
      //   display: 'inline-block',
      //   'vertical-align': 'middle',
      // },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        script: 'Homemade Apple',
      },
    }),
  ],
  shortcuts: {
    'flex-c': 'flex items-center',
    'flex-b': 'flex justify-between',
    'flex-cc': 'flex items-center justify-center',
    'flex-cb': 'flex items-center justify-between',
    'flex-center': 'flex justify-center items-center',
    'flex-x-c': 'flex justify-center',
    'flex-y-c': 'flex items-center',
    'flex-x-b': 'flex items-center justify-between',
    'flex-x-e': 'flex items-center justify-end',
    'flex-xc': 'flex justify-center',
    'flex-yc': 'flex items-center',
    'flex-xb': 'flex items-center justify-between',
    'flex-xe': 'flex items-center justify-end',
    'wh-full': 'w-full h-full',
    'text-truncate': 'whitespace-nowrap overflow-hidden text-ellipsis',
    'bg-no-repeat-contain': 'bg-no-repeat bg-contain',
    'bg-no-repeat-cover': 'bg-no-repeat bg-cover',
    'abs-full': 'absolute left-0 right-0 top-0 bottom-0',
    'abs-x-c': 'absolute left-50% top-0 translate-x--1/2',
    'abs-y-c': 'absolute left-0 top-50% translate-y--1/2',
    'abs-c': 'absolute left-50% top-50% translate-x--1/2 translate-y--1/2',
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // By default, `.ts` and `.js` files are NOT extracted.
  // If you want to extract them, use the following configuration.
  // It's necessary to add the following configuration if you use shadcn-vue or shadcn-svelte.
  content: {
    filesystem: [
      './index.html',
      ...tailwindPackages.map((item) =>
        path.join(item, 'src/**/*.{vue,js,ts,jsx,tsx,svelte,astro,html}'),
      ),
    ],
    // pipeline: {
    //   include:
    //     // the default
    //     // /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
    //     // include js/ts files
    //     // '(components|src)/**/*.{js,ts}',

    // },
  },
  preflights: [{ getCSS: () => getCSSVariable() }],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    // extend: {
    animation: {
      keyframes: {
        custom:
          '{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}',
        'accordion-down':
          '{ from: { height: 0 } to { height: var(--reka-accordion-content-height) } }',
        'accordion-up':
          '{ from: { height: var(--reka-accordion-content-height) } to { height: 0 } }',
        'collapsible-down':
          '{ from: { height: 0 } to { height: var(--reka-collapsible-content-height) } }',
        'collapsible-up':
          '{ from: { height: var(--reka-collapsible-content-height) } to { height: 0 } }',
        float:
          '{0%, 100% { transform: translateY(0) } 50% { transform: translateY(-20px)} }',
        progress:
          '{ 0% { background-position: 0 0 } 100% { background-position: 30px 30px } }',
      },
      durations: {
        custom: '1s',
        float: '5s',
        'accordion-down': '0.2s',
        'accordion-up': '0.2s',
        'collapsible-down': '0.2s',
        'collapsible-up': '0.2s',
        progress: '1s',
      },
      timingFns: {
        custom: 'cubic-bezier(0.4,0,.6,1)',
        float: 'linear',
        'accordion-down': 'ease-out',
        'accordion-up': 'ease-out',
        'collapsible-down': 'ease-in-out',
        'collapsible-up': 'ease-in-out',
        progress: 'linear',
      },
      properties: {
        custom: { 'transform-origin': 'center' },
      },
      counts: {
        custom: 'infinite',
        float: 'infinite',
        progress: 'infinite',
      },
    },

    animationDuration: {
      '2000': '2000ms',
      '3000': '3000ms',
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
      xl: 'calc(var(--radius) + 4px)',
    },
    boxShadow: {
      float: `0 6px 16px 0 rgb(0 0 0 / 8%),
              0 3px 6px -4px rgb(0 0 0 / 12%),
              0 9px 28px 8px rgb(0 0 0 / 5%)`,
    },
    colors: {
      ...customColors,
      ...shadcnUiColors,
    },
    fontFamily: {
      sans: [
        'var(--font-family)',
        //  ...defaultTheme.fontFamily.sans
      ],
    },
    zIndex: {
      '100': '100',
      '1000': '1000',
    },
    // },
  },
  // rules: [
  //   [/^bg-sidebar$/, () => ({ 'background-color': 'hsl(var(--sidebar))' })],
  //   [
  //     /^bg-sidebar-deep$/,
  //     () => ({ 'background-color': 'hsl(var(--sidebar-deep))' }),
  //   ],
  // ],
  safelist: ['dark'],
  // darkMode: 'class',
});

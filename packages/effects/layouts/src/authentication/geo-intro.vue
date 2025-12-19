<!-- 登录、注册、忘记密码左侧背景 -->
<script setup lang="ts">
import { nextTick } from 'vue';

import { updatePreferences, usePreferences } from '@qin/preferences';

import SloganIcon from './icons/slogan.vue';

interface Props {
  panelEnter?: 'center' | 'left' | 'right';
  pageTitle?: string;
  pageDescription?: string;
  sloganImage?: string;
}

withDefaults(defineProps<Props>(), {
  panelEnter: 'left',
  pageTitle: '',
  pageDescription: '',
  sloganImage: '',
});

const { isDark } = usePreferences();
function toggleTheme(event: MouseEvent) {
  const isAppearanceTransition =
    // @ts-expect-error
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isAppearanceTransition || !event) {
    // isDark.value = !isDark.value;
    updatePreferences({
      theme: { mode: isDark.value ? 'light' : 'dark' },
    });
    return;
  }

  // @ts-ignore startViewTransition
  const transition = document.startViewTransition(async () => {
    updatePreferences({
      theme: { mode: isDark.value ? 'light' : 'dark' },
    });
    await nextTick();
  });

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    const animate = document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath.toReversed() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in',
        fill: 'both',
        pseudoElement: isDark.value
          ? '::view-transition-old(theme)'
          : '::view-transition-new(theme)',
      },
    );
    animate.onfinish = () => {
      transition.skipTransition();
    };
  });
}
</script>

<template>
  <div
    class="login-left-view w-65vh h-100vh p-15px relative box-border min-h-full overflow-hidden"
    :class="`panel-enter-${panelEnter}`"
  >
    <div
      class="pb-80px wh-full container relative z-10 flex flex-col items-center justify-end"
    >
      <div class="left-img w-35% mb-3vh">
        <template v-if="sloganImage">
          <img :src="sloganImage" :alt="pageTitle" class="slogan-img" />
        </template>
        <SloganIcon
          v-else
          class="slogan-icon wh-full object-contain"
          :alt="pageTitle"
        />
      </div>

      <div
        class="max-w-600px py-20px text-wrap text-center"
        v-if="pageTitle || pageDescription"
      >
        <h1
          v-if="pageTitle"
          class="mb-12px text-28px font-500 tracking-0.3px text-foreground"
        >
          {{ pageTitle }}
        </h1>
        <p
          v-if="pageDescription"
          class="text-15px leading-1.6 text-muted-foreground m-0"
        >
          {{ pageDescription }}
        </p>
      </div>
    </div>

    <!-- 几何装饰元素 -->
    <div class="geometric-decorations">
      <!-- 基础几何形状 -->
      <div
        class="geo-element circle-outline top-10% left-25% w-42px h-42px rounded-50% animate-fade-in-up absolute border-2 border-solid border-[hsl(var(--primary-800))]"
        style="animation-delay: 0s"
      ></div>
      <div
        class="geo-element square-rotated top-50% left-16% w-60px h-60px animate-fade-in-left absolute"
        style="animation-delay: 0s"
      ></div>
      <div
        class="geo-element circle-small bottom-26% left-30% w-18px h-18px rounded-50% animate-fade-in-up absolute bg-[hsl(var(--primary-800))]"
        style="animation-delay: 0.3s"
      ></div>

      <div
        class="geo-element square-bottom-right right-10% bottom-10% w-50px h-50px animate-fade-in-right absolute bg-[hsl(var(--primary-800))]"
        style="animation-delay: 0s"
      ></div>

      <!-- 背景泡泡 -->
      <div
        class="geo-element bg-bubble w-360px h-360px rounded-50% animate-scale-in absolute right-[-120px] top-[-120px]"
        style="animation-delay: 0.5"
      ></div>

      <!-- 太阳/月亮 -->
      <div
        class="geo-element circle-top-right top-3% right-3% z-100 w-50px h-50px rounded-50% animate-fade-in-down absolute cursor-pointer"
        style="animation-delay: 0.5"
        @click="toggleTheme"
      ></div>

      <!-- 装饰点 -->
      <div
        class="geo-element w-14px h-14px rounded-50% top-140px left-100px animate-bounce-in absolute bg-[hsl(var(--primary-700))]"
        style="animation-delay: 0s"
      ></div>
      <div
        class="geo-element dot w-14px h-14px rounded-50% top-140px right-120px animate-bounce-in absolute bg-[hsl(var(--primary-700))]"
        style="animation-delay: 0s"
      ></div>
      <div
        class="geo-element dot w-14px h-14px rounded-50% top-46% right-22% animate-bounce-in absolute bg-[hsl(var(--primary-800))]"
        style="animation-delay: 0s"
      ></div>

      <!-- 叠加方块组 -->
      <div
        class="squares-group bottom-18px left-20px w-140px h-140px pointer-events-none absolute"
      >
        <i
          class="geo-element square rounded-8px square-blue top-12px left-30px z-2 w-50px h-50px animate-fade-in-left-rotated-blue absolute block opacity-0"
          style="animation-delay: 0.2s"
        ></i>
        <i
          class="geo-element square rounded-8px square-pink top-30px left-48px z-1 w-70px h-70px animate-fade-in-left-rotated-pink absolute block opacity-0"
          style="animation-delay: 0.4s"
        ></i>
        <i
          class="geo-element square rounded-8px square-purple top-66px left-86px z-3 w-32px h-32px animate-fade-in-left-no-rotation absolute block opacity-0"
          style="animation-delay: 0.6s"
        ></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 颜色变量定义
$primary-light-7: hsl(var(--primary-700));
$primary-light-8: hsl(var(--primary-800));
$primary-light-9: hsl(var(--primary-900));
$primary-base: hsl(var(--primary));
$main-bg: hsl(var(--border));

// 混合颜色函数
$bg-mix-light-9: color-mix(in srgb, $primary-light-9 100%, $main-bg);
$bg-mix-light-8: color-mix(in srgb, $primary-light-8 80%, $main-bg);
$bg-mix-light-7: color-mix(in srgb, $primary-light-7 80%, $main-bg);

.login-left-view {
  background-color: $bg-mix-light-9;

  @media only screen and (width <= 1600px) {
    width: 60vw;

    .text-wrap {
      bottom: 40px;
    }
  }

  @media only screen and (width <= 1180px) {
    width: auto;
    height: auto;
    padding: 0;
    background: transparent;

    .left-img,
    .text-wrap,
    .geometric-decorations {
      display: none;
    }
  }

  &.panel-enter-left {
    .geometric-decorations {
      .circle-top-right {
        top: 3%;
        right: auto;
        left: 3%;
      }

      .bg-bubble {
        top: -120px;
        right: auto;
        left: -120px;
      }

      .circle-outline {
        left: 70%;
      }

      .square-rotated {
        left: 80%;
      }

      .circle-small {
        left: 75%;
      }

      .square-bottom-right {
        right: auto;
        bottom: 10%;
        left: 10%;
      }

      .dot-top-left {
        right: 100px;
        left: auto;
      }

      .dot-top-right {
        right: auto;
        left: 120px;
      }

      .dot-center-right {
        top: 46%;
        right: auto;
        left: 22%;
      }

      .squares-group {
        right: 20px;
        bottom: 18px;
        left: auto;
      }

      .line-1 {
        top: 30%;
        right: 20%;
        left: auto;
      }

      .line-2 {
        top: 70%;
        right: 70%;
        left: auto;
      }
    }
  }

  &.panel-enter-center {
    .content-container {
      align-items: center;
    }
  }

  &.panel-enter-right {
    .content-container {
      padding-right: 4vw;
    }
  }

  .container {
    animation: slide-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

    .left-img {
      animation: float 6s ease-in-out infinite alternate;
    }

    .text-wrap {
      animation: slide-in-left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        forwards;
    }
  }

  .geometric-decorations {
    // 动画 mixin
    @mixin fadeAnimation($direction: '', $rotation: 0deg) {
      from {
        @if $direction == 'up' {
          transform: translateY(30px) rotate($rotation);
          /* stylelint-disable-next-line at-rule-empty-line-before */
        } @else if $direction == 'down' {
          transform: translateY(-30px) rotate($rotation);
          /* stylelint-disable-next-line at-rule-empty-line-before */
        } @else if $direction == 'left' {
          transform: translateX(-30px) rotate($rotation);
          /* stylelint-disable-next-line at-rule-empty-line-before */
        } @else if $direction == 'right' {
          transform: translateX(30px) rotate($rotation);
        }

        opacity: 0;
      }

      to {
        @if $direction == 'up' or $direction == 'down' {
          transform: translateY(0) rotate($rotation);
          /* stylelint-disable-next-line at-rule-empty-line-before */
        } @else {
          transform: translateX(0) rotate($rotation);
        }

        opacity: 1;
      }
    }

    // 动画定义
    @keyframes fade-in-up {
      @include fadeAnimation('up');
    }

    @keyframes fade-in-down {
      @include fadeAnimation('down');
    }

    @keyframes fade-in-left {
      @include fadeAnimation('left');
    }

    @keyframes fade-in-left-rotated {
      @include fadeAnimation('left', -25deg);
    }

    @keyframes fade-in-right {
      @include fadeAnimation('right');
    }

    @keyframes fade-in-right-rotated {
      @include fadeAnimation('right', 45deg);
    }

    @keyframes fade-in-left-rotated-blue {
      @include fadeAnimation('left', -10deg);
    }

    @keyframes fade-in-left-rotated-pink {
      @include fadeAnimation('left', 10deg);
    }

    @keyframes fade-in-left-no-rotation {
      @include fadeAnimation('left');
    }

    @keyframes scale-in {
      from {
        opacity: 0;
        transform: scale(0.8);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes bounce-in {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }

      50% {
        opacity: 1;
        transform: scale(1.05);
      }

      70% {
        transform: scale(0.9);
      }

      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes line-grow {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes slide-in-left {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .geo-element {
      animation-fill-mode: forwards;
      animation-duration: 0.8s;
      animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    // 动画类
    .animate-fade-in-up {
      animation-name: fade-in-up;
    }

    .animate-fade-in-down {
      animation-name: fade-in-down;
    }

    .animate-fade-in-left {
      animation-name: fade-in-left;
    }

    .animate-fade-in-right {
      animation-name: fade-in-right;
    }

    .animate-scale-in {
      animation-name: scale-in;
      animation-duration: 1.2s;
    }

    .animate-bounce-in {
      animation-name: bounceIn;
      animation-duration: 0.6s;
    }

    .animate-fade-in-left-rotated-blue {
      animation-name: fade-in-left-rotated-blue;
    }

    .animate-fade-in-left-rotated-pink {
      animation-name: fade-in-left-rotated-pink;
    }

    .animate-fade-in-left-no-rotation {
      animation-name: fade-in-left-no-rotation;
    }

    .square-rotated {
      background-color: $bg-mix-light-8;

      &.animate-fade-in-left {
        animation-name: fade-in-left-rotated;
      }
    }

    .circle-small {
      background-color: $primary-light-8;
    }

    // 太阳/月亮效果
    .circle-top-right {
      background: $bg-mix-light-7;
      transition: all 0.3s;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        content: '';
        background: linear-gradient(to right, #fcbb04, #fffc00);
        border-radius: 50%;
        opacity: 0;
        transition: all 0.5s;
        transform: translate(-50%, -50%);
      }

      &:hover {
        box-shadow: 0 0 36px #fffc00;

        &::after {
          opacity: 1;
        }
      }
    }

    .square-bottom-right {
      background-color: $primary-light-8;

      &.animate-fade-in-right {
        animation-name: fade-in-right-rotated;
      }
    }

    // 背景泡泡
    .bg-bubble {
      background-color: $bg-mix-light-8;
    }

    // 装饰点
    .dot {
      background-color: $primary-light-7;
    }

    // 叠加方块组
    .squares-group {
      .square {
        &.square-blue {
          background-color: rgb(from $primary-base r g b / 30%);
        }

        &.square-pink {
          background-color: rgb(from $primary-base r g b / 15%);
        }

        &.square-purple {
          background-color: rgb(from $primary-base r g b / 45%);
        }
      }

      // 装饰线条
      &::after {
        position: absolute;
        top: 86px;
        left: 72px;
        width: 80px;
        height: 1px;
        content: '';
        background: linear-gradient(
          90deg,
          var(--el-color-primary-light-6),
          transparent
        );
        opacity: 0;
        transform: rotate(50deg);
        animation: line-grow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        animation-delay: 1.2s;
      }
    }
  }
}

// 暗色主题
.dark .login-left-view {
  background-color: color-mix(in srgb, $primary-light-9 60%, #070707);

  @media only screen and (width <= 1180px) {
    background: transparent;
  }

  .geometric-decorations {
    // 月亮效果
    .circle-top-right {
      background-color: $bg-mix-light-8;
      box-shadow: 0 0 25px #333 inset;
      transition: all 0.3s ease-in-out 0.1s;
      rotate: -48deg;

      &::before {
        position: absolute;
        top: 0;
        left: 15px;
        width: 50px;
        height: 50px;
        content: '';
        background-color: $bg-mix-light-9;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
      }

      &:hover {
        background-color: transparent;
        box-shadow: 0 40px 25px #ddd inset;

        &::before {
          left: 18px;
        }

        &::after {
          opacity: 0;
        }
      }
    }

    .bg-bubble {
      background-color: $bg-mix-light-9;
    }

    // 其他元素颜色调整
    .square-rotated {
      background-color: $bg-mix-light-8;
    }

    .circle-small,
    .dot {
      background-color: $primary-light-8;
    }

    .square-bottom-right {
      background-color: $primary-light-8;
    }

    .dot.dot-top-right {
      background-color: $primary-light-8;
    }
  }

  // 方块组暗色调整
  .squares-group {
    .square {
      box-shadow: none;

      &.square-blue {
        background-color: rgb(from $primary-base r g b / 18%);
      }

      &.square-pink {
        background-color: rgb(from $primary-base r g b / 10%);
      }

      &.square-purple {
        background-color: rgb(from $primary-base r g b / 20%);
      }
    }

    &::after {
      background: linear-gradient(90deg, $primary-light-8, transparent);
    }
  }
}
</style>

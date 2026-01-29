<script lang="ts" setup>
import SloganIcon from './icons/slogan.vue';

interface Props {
  panelEnter?: 'center' | 'left' | 'right';
  appName?: string;
  pageTitle?: string;
  pageDescription?: string;
  sloganImage?: string;
}

withDefaults(defineProps<Props>(), {
  panelEnter: 'left',
  appName: '',
  pageTitle: '',
  pageDescription: '',
  sloganImage: '',
});
</script>

<template>
  <div class="relative hidden w-0 flex-1 lg:block">
    <div class="bg-background-deep wh-full absolute inset-0 dark:bg-[#070709]">
      <div class="login-background absolute top-0 left-0 size-full"></div>
      <div
        :key="panelEnter"
        :class="{
          'enter-x': panelEnter === 'left',
          '-enter-x': panelEnter === 'right',
        }"
        class="flex-col-center mr-20 h-full"
      >
        <template v-if="sloganImage">
          <img
            :alt="appName"
            :src="sloganImage"
            class="animate-float h-64 w-2/5"
          />
        </template>
        <SloganIcon
          v-else
          :alt="appName"
          class="animate-float inline-block h-64 w-2/5"
        />
        <div class="text-1xl text-foreground mt-6 font-sans lg:text-2xl">
          {{ pageTitle }}
        </div>
        <div class="dark:text-muted-foreground mt-2">
          {{ pageDescription }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-background {
  background: linear-gradient(
    154deg,
    #07070915 30%,
    hsl(var(--primary) / 30%) 48%,
    #07070915 64%
  );
  filter: blur(100px);
}

.dark {
  .login-background {
    background: linear-gradient(
      154deg,
      #07070915 30%,
      hsl(var(--primary) / 20%) 48%,
      #07070915 64%
    );
    filter: blur(100px);
  }
}
</style>

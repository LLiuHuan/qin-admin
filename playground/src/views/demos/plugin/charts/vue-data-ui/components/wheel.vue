<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-11-26 10:19:58
 * @LastEditTime: 2025-11-26 10:23:10
 * @LastEditors: LLiuHuan
-->
<script setup>
import { ref } from 'vue';
import { VueUiWheel } from 'vue-data-ui';

const config = ref({
  style: {
    chart: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      height: 338,

      layout: {
        innerCircle: {
          stroke: '#CCCCCC',
        },
        wheel: {
          tiltAngle3d: 60,
          ticks: {
            inactiveColor: '#CCCCCC',
          },
        },
      },
      title: {
        text: 'Title',
        color: '#1A1A1A',
        textAlign: 'left',
        paddingLeft: 24,
        subtitle: {
          text: 'Subtitle',
        },
      },
    },
  },
});

const dataset = ref({
  percentage: 80,
});
</script>
<template>
  <!-- Using a wrapper div is optional -->
  <div>
    <VueUiWheel :config="config" :dataset="dataset">
      <!-- SLOTS -->
    </VueUiWheel>
  </div>
</template>

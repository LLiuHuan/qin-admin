<script setup>
import { ref } from 'vue';
import { VueUiTreemap } from 'vue-data-ui';

const config = ref({
  table: {
    th: {
      backgroundColor: '#FFFFFFff',
      color: '#1A1A1Aff',
    },
    td: {
      backgroundColor: '#FFFFFFff',
      color: '#1A1A1Aff',
    },
  },
  style: {
    chart: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      legend: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A',
      },
      layout: {
        rects: {
          stroke: '#FFFFFF',
          selected: {
            stroke: '#FFFFFF',
          },
          group: {
            useSeriesBackgroundColor: true,
            backgroundLighterRatio: 0.2,
          },
          colorRatio: 0,
          gradient: {
            show: false,
          },
        },
      },
      title: {
        text: 'Title',
        color: '#1A1A1A',
        textAlign: 'left',
        paddingLeft: 12,
        subtitle: {
          text: 'Subtitle',
        },
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A',
        borderColor: '#CCCCCC',
        backgroundOpacity: 70,
      },
    },
  },
});

const dataset = ref([
  {
    name: 'Parent 1',
    value: 100,
    children: [
      {
        name: 'P1 C1',
        value: 70,
        id: '56e37521-b44d-403d-8837-ba02e85faf73',
        parentId: 'e5cdaf3a-7043-47e4-9ae4-9f23c0f4d4bf',
        color: '#1f77b4ff',
      },
      {
        name: 'P1 C2',
        value: 20,
        id: '01f98aff-fece-4f65-91e4-379e58b57bdd',
        parentId: 'e5cdaf3a-7043-47e4-9ae4-9f23c0f4d4bf',
        color: '#1f77b4ff',
      },
      {
        name: 'P1 C3',
        value: 10,
        id: 'ef27fb51-03f7-447f-9599-9d75c916fe2d',
        parentId: 'e5cdaf3a-7043-47e4-9ae4-9f23c0f4d4bf',
        color: '#1f77b4ff',
      },
    ],
    id: 'e5cdaf3a-7043-47e4-9ae4-9f23c0f4d4bf',
    color: '#1f77b4ff',
  },
  {
    name: 'Parent 2',
    value: 110,
    children: [
      {
        name: 'P2 C1',
        value: 80,
        id: 'dce296ff-281f-4d9f-9f87-d08659df5c9e',
        parentId: '29ec32e0-8af4-485a-b314-1004a3a92449',
        color: '#aec7e8ff',
      },
      {
        name: 'P2 C2',
        value: 20,
        id: 'e2207097-935d-4c31-9d98-e434ef61f5e4',
        parentId: '29ec32e0-8af4-485a-b314-1004a3a92449',
        color: '#aec7e8ff',
      },
      {
        name: 'P2 C3',
        value: 10,
        id: 'de900a8e-562d-4ee8-bcf5-dda2c25514b7',
        parentId: '29ec32e0-8af4-485a-b314-1004a3a92449',
        color: '#aec7e8ff',
      },
    ],
    id: '29ec32e0-8af4-485a-b314-1004a3a92449',
    color: '#aec7e8ff',
  },
  {
    name: 'Parent 3',
    value: 75,
    children: [
      {
        name: 'P3 C1',
        value: 20,
        id: 'cba84710-e152-4d96-8fba-2dbf96afab81',
        parentId: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
        color: '#ff7f0eff',
      },
      {
        name: 'P3 C2',
        value: 10,
        id: 'bebd936d-d288-4329-b719-e1edc00464e8',
        parentId: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
        color: '#ff7f0eff',
      },
      {
        name: 'P3 C3',
        value: 10,
        id: '7d82b719-e1c3-4a40-9b49-8d59c01749ef',
        parentId: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
        color: '#ff7f0eff',
      },
      {
        name: 'P3 C4',
        value: 5,
        id: '852b4c35-a2b1-4668-a9eb-57e81b767bb0',
        parentId: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
        color: '#ff7f0eff',
      },
      {
        name: 'P3 C5',
        value: 5,
        id: '565bfc90-b89f-4c4c-aecb-0671c42b5a4f',
        parentId: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
        color: '#ff7f0eff',
      },
      {
        name: 'P3 C6',
        value: 10,
        id: 'bc352e1a-349a-4503-ba94-581992b11658',
        parentId: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
        color: '#ff7f0eff',
      },
      {
        name: 'P3 C7',
        value: 5,
        id: 'e1649a97-ac81-45e1-a915-13f0d55428b6',
        parentId: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
        color: '#ff7f0eff',
      },
      {
        name: 'P3 C8',
        value: 10,
        children: [
          {
            name: 'P3 C8 CC1',
            value: 5,
            id: 'd5b26b87-84f3-4c38-a033-220469eece3a',
            parentId: '59a882ca-6f37-44aa-adf2-e9b49200c0fb',
            color: '#ff7f0eff',
          },
          {
            name: 'P3 C8 CC2',
            value: 5,
            id: '2ab32460-58cb-4795-9f7b-d906850a0be5',
            parentId: '59a882ca-6f37-44aa-adf2-e9b49200c0fb',
            color: '#ff7f0eff',
          },
        ],
        id: '59a882ca-6f37-44aa-adf2-e9b49200c0fb',
        parentId: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
        color: '#ff7f0eff',
      },
    ],
    id: 'e69a0fb5-18e9-4d99-a952-391d4c2c318b',
    color: '#ff7f0eff',
  },
  {
    name: 'Parent 4',
    value: 30,
    children: [
      {
        name: 'P4 C1',
        value: 10,
        id: 'f1045f44-ef8b-4a67-a75c-081b6372d8ee',
        parentId: '70789eee-16e0-4518-8e09-7d1114dae1d2',
        color: '#ffbb78ff',
      },
      {
        name: 'P4 C2',
        value: 15,
        id: '00bc374d-f201-494b-b7b7-10756fdf39bd',
        parentId: '70789eee-16e0-4518-8e09-7d1114dae1d2',
        color: '#ffbb78ff',
      },
      {
        name: 'P4 C3',
        value: 5,
        id: '97dcbd67-ea1a-4dc0-8cc1-1b6835ffe03c',
        parentId: '70789eee-16e0-4518-8e09-7d1114dae1d2',
        color: '#ffbb78ff',
      },
    ],
    id: '70789eee-16e0-4518-8e09-7d1114dae1d2',
    color: '#ffbb78ff',
  },
  {
    name: 'Parent 5',
    value: 30,
    children: [
      {
        name: 'P5 C1',
        value: 10,
        id: 'e04f0529-0cab-4e4b-8c8d-fb4228f2574c',
        parentId: 'c96a2bb7-cc67-4599-b40a-318c7fcda279',
        color: '#2ca02cff',
      },
      {
        name: 'P5 C2',
        value: 15,
        id: '672eac30-0ee0-4671-9e70-1ee2e6a2b5ab',
        parentId: 'c96a2bb7-cc67-4599-b40a-318c7fcda279',
        color: '#2ca02cff',
      },
      {
        name: 'P5 C3',
        value: 5,
        id: '3411b6b5-e8a9-475c-b8b1-ee523c56ea4c',
        parentId: 'c96a2bb7-cc67-4599-b40a-318c7fcda279',
        color: '#2ca02cff',
      },
    ],
    id: 'c96a2bb7-cc67-4599-b40a-318c7fcda279',
    color: '#2ca02cff',
  },
]);
</script>
<template>
  <!-- Using a wrapper div is optional -->
  <div>
    <VueUiTreemap :config="config" :dataset="dataset">
      <!-- SLOTS -->
    </VueUiTreemap>
  </div>
</template>

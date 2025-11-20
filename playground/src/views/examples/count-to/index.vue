<script lang="ts" setup>
import type { CountToProps, TransitionPresets } from '@qin/common-ui';

import { reactive } from 'vue';

import { CountTo, Page, TransitionPresetsKeys } from '@qin/common-ui';
import { IconifyIcon } from '@qin/icons';

import {
  Button,
  Card,
  Col,
  Form,
  FormItem,
  Input,
  InputNumber,
  Message,
  Row,
  Select,
  Switch,
} from '@arco-design/web-vue';

const props = reactive<CountToProps & { transition: TransitionPresets }>({
  decimal: '.',
  decimals: 2,
  decimalStyle: {
    fontSize: 'small',
    fontStyle: 'italic',
  },
  delay: 0,
  disabled: false,
  duration: 2000,
  endVal: 100_000,
  mainStyle: {
    color: 'hsl(var(--primary))',
    fontSize: 'xx-large',
    fontWeight: 'bold',
  },
  prefix: '￥',
  prefixStyle: {
    paddingRight: '0.5rem',
  },
  separator: ',',
  startVal: 0,
  suffix: '元',
  suffixStyle: {
    paddingLeft: '0.5rem',
  },
  transition: 'easeOutQuart',
});

function changeNumber() {
  props.endVal =
    Math.floor(Math.random() * 100_000_000) / 10 ** (props.decimals || 0);
}

function openDocumentation() {
  window.open('https://vueuse.org/core/useTransition/', '_blank');
}

function onStarted() {
  Message.loading({
    content: '动画已开始',
    duration: 0,
    id: 'animator-info',
  });
}

function onFinished() {
  Message.success({
    content: '动画已结束',
    duration: 2,
    id: 'animator-info',
  });
}
</script>
<template>
  <Page description="数字滚动动画组件。使用" title="CountTo">
    <template #description>
      <span>
        使用useTransition封装的数字滚动动画组件，每次改变当前值都会产生过渡动画。
      </span>
      <Button type="text" @click="openDocumentation">
        查看useTransition文档
      </Button>
    </template>
    <Card title="基本用法">
      <div class="flex w-full items-center justify-center pb-4">
        <CountTo v-bind="props" @finished="onFinished" @started="onStarted" />
      </div>
      <Form :model="props">
        <Row :gutter="20">
          <Col :span="8">
            <FormItem label="初始值" name="startVal">
              <InputNumber v-model="props.startVal" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="当前值" name="endVal">
              <InputNumber
                v-model="props.endVal"
                :precision="props.decimals"
                class="w-full"
              >
                <template #append>
                  <IconifyIcon
                    v-tippy="`设置一个随机值`"
                    class="size-5 cursor-pointer outline-none"
                    icon="ix:random-filled"
                    @click="changeNumber"
                  />
                </template>
              </InputNumber>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="禁用动画" name="disabled">
              <Switch v-model="props.disabled" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="延迟动画" name="delay">
              <InputNumber v-model="props.delay" :min="0" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="持续时间" name="duration">
              <InputNumber v-model="props.duration" :min="0" />
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem label="小数位数" name="decimals">
              <InputNumber v-model="props.decimals" :min="0" :precision="0" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="分隔符" name="separator">
              <Input v-model="props.separator" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="小数点" name="decimal">
              <Input v-model="props.decimal" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="动画" name="transition">
              <Select v-model="props.transition">
                <Select.Option
                  v-for="preset in TransitionPresetsKeys"
                  :key="preset"
                  :value="preset"
                >
                  {{ preset }}
                </Select.Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="前缀" name="prefix">
              <Input v-model="props.prefix" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="后缀" name="suffix">
              <Input v-model="props.suffix" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  </Page>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Editor, Page } from '@qin/common-ui';

import {
  Button,
  Card,
  Col,
  Message,
  Row,
  TabPane,
  Tabs,
  Textarea,
} from '@arco-design/web-vue';
import DOMPurify from 'dompurify';

const fullEditorRef = useTemplateRef('fullEditorRef');
const simpleEditorRef = useTemplateRef('simpleEditorRef');

const fullActiveTab = ref('preview');
const simpleActiveTab = ref('preview');
const activeCollapse = ref(['basic']);

/**
 * 简化工具栏配置
 * 只包含基础的编辑功能
 */
const simpleToolbarKeys = [
  'bold',
  'italic',
  'underline',
  '|',
  'bulletedList',
  'numberedList',
  '|',
  'insertLink',
  'insertImage',
  '|',
  'undo',
  'redo',
];

// 完整编辑器内容
const fullEditorHtml = ref(`<h1>🎨 完整工具栏编辑器示例</h1>
<p>这个编辑器包含所有功能，您可以体验丰富的格式编辑功能。</p>

<h2>✨ 文本样式</h2>
<p><strong>这是加粗的文字</strong></p>
<p><em>这是斜体文字</em></p>
<p><u>这是下划线文字</u></p>
<p><span style="color: rgb(194, 79, 74);">这是彩色文字</span></p>

<h2>📝 列表和待办</h2>
<ul>
  <li>无序列表项 1</li>
  <li>无序列表项 2</li>
</ul>

<ol>
  <li>有序列表项 1</li>
  <li>有序列表项 2</li>
</ol>

<ul class="w-e-todo">
  <li class="w-e-todo-item"><input type="checkbox" checked="true" readonly="true" disabled="disabled"><span>已完成的任务</span></li>
  <li class="w-e-todo-item"><input type="checkbox" readonly="true" disabled="disabled"><span>待完成的任务</span></li>
</ul>

<h2>💬 引用和表格</h2>
<blockquote>
  这是一段引用文字，展示引用格式的效果。
</blockquote>

<table style="border-collapse: collapse; width: 100%;" border="1">
  <thead>
    <tr><th>功能</th><th>描述</th></tr>
  </thead>
  <tbody>
    <tr><td>完整工具栏</td><td>包含所有编辑功能</td></tr>
    <tr><td>自定义配置</td><td>支持灵活的工具栏配置</td></tr>
  </tbody>
</table>

<h2>💻 代码块</h2>
<pre><code class="language-javascript">// 完整编辑器支持代码高亮
function createEditor() {
  return new WangEditor({
    container: '#editor',
    toolbar: 'full' // 完整工具栏
  });
}</code></pre>

<p>🔗 <a href="https://www.wangeditor.com/" target="_blank">访问官网了解更多</a></p>`);

// 简化编辑器内容
const simpleEditorHtml = ref(`<h1>✨ 简化工具栏编辑器示例</h1>
<p>这个编辑器只包含基础的编辑功能，界面更加简洁。</p>

<h2>基础文本格式</h2>
<p><strong>加粗文字</strong></p>
<p><em>斜体文字</em></p>
<p><u>下划线文字</u></p>

<h2>列表功能</h2>
<ul>
  <li>无序列表项 1</li>
  <li>无序列表项 2</li>
</ul>

<ol>
  <li>有序列表项 1</li>
  <li>有序列表项 2</li>
</ol>

<h2>链接和图片</h2>
<p>支持插入 <a href="https://www.wangeditor.com/" target="_blank">链接</a> 和图片。</p>

<p>简化版编辑器专注于基础功能，适合简单的内容编辑需求。</p>`);

/**
 * 清空完整编辑器内容
 */
const clearFullEditor = () => {
  fullEditorRef.value?.clear();
  Message.success('完整编辑器已清空');
};

/**
 * 获取完整编辑器内容
 */
const getFullEditorContent = () => {
  const content = fullEditorRef.value?.getHtml();
  console.log('完整编辑器内容:', content);
  Message.success('完整编辑器内容已输出到控制台');
};

/**
 * 设置完整编辑器演示内容
 */
const setFullEditorDemo = () => {
  const demoContent = `<h2>🎉 完整编辑器演示内容</h2>
<p>这是通过方法设置的演示内容，展示完整编辑器的强大功能。</p>
<ul>
  <li>支持丰富的文本格式</li>
  <li>包含表格、代码块等高级功能</li>
  <li>提供完整的编辑体验</li>
</ul>
<table style="border-collapse: collapse; width: 100%;" border="1">
  <tr><th>特性</th><th>状态</th></tr>
  <tr><td>完整工具栏</td><td>✅ 已启用</td></tr>
  <tr><td>高级功能</td><td>✅ 已启用</td></tr>
</table>`;

  fullEditorRef.value?.setHtml(demoContent);
  Message.success('已设置完整编辑器演示内容');
};

/**
 * 清空简化编辑器内容
 */
const clearSimpleEditor = () => {
  simpleEditorRef.value?.clear();
  Message.success('简化编辑器已清空');
};

/**
 * 获取简化编辑器内容
 */
const getSimpleEditorContent = () => {
  const content = simpleEditorRef.value?.getHtml();
  console.log('简化编辑器内容:', content);
  Message.success('简化编辑器内容已输出到控制台');
};

/**
 * 设置简化编辑器演示内容
 */
const setSimpleEditorDemo = () => {
  const demoContent = `<h2>⚡ 简化编辑器演示内容</h2>
<p>这是通过方法设置的演示内容，展示简化编辑器的核心功能。</p>
<ul>
  <li><strong>基础格式</strong>：加粗、斜体、下划线</li>
  <li><em>列表支持</em>：有序和无序列表</li>
  <li><u>媒体插入</u>：链接和图片</li>
</ul>
<ol>
  <li>界面简洁清爽</li>
  <li>功能专注实用</li>
  <li>适合快速编辑</li>
</ol>
<p>🔗 <a href="https://example.com" target="_blank">这是一个链接示例</a></p>`;

  simpleEditorRef.value?.setHtml(demoContent);
  Message.success('已设置简化编辑器演示内容');
};
</script>

<template>
  <Page title="富文本示例">
    <Card class="mb-4" title="完整工具栏编辑器">
      <template #extra>
        <div class="header-buttons">
          <Button size="mini" type="outline" @click="clearFullEditor">
            清空
          </Button>
          <Button size="mini" type="outline" @click="getFullEditorContent">
            获取内容
          </Button>
          <Button size="mini" type="outline" @click="setFullEditorDemo">
            设置示例
          </Button>
        </div>
      </template>
      <Editor
        ref="fullEditorRef"
        v-model="fullEditorHtml"
        height="400px"
        placeholder="请输入内容，体验完整的编辑功能..."
        :exclude-keys="[]"
      />
    </Card>

    <Card class="mb-4" title="简化工具栏编辑器">
      <template #extra>
        <div class="header-buttons">
          <Button size="mini" type="outline" @click="clearSimpleEditor">
            清空
          </Button>
          <Button size="mini" type="outline" @click="getSimpleEditorContent">
            获取内容
          </Button>
          <Button size="mini" type="outline" @click="setSimpleEditorDemo">
            设置示例
          </Button>
        </div>
      </template>

      <Editor
        ref="simpleEditorRef"
        v-model="simpleEditorHtml"
        height="400px"
        placeholder="请输入内容，体验简化的编辑功能..."
        :toolbar-keys="simpleToolbarKeys"
      />
    </Card>

    <Card class="mb-4" title="内容预览对比">
      <Row :gutter="16">
        <Col :span="12">
          <h3>完整编辑器内容</h3>
          <Tabs default-active-key="1">
            <TabPane key="1" title="Tab 1">
              <div
                class="content-preview"
                v-html="DOMPurify.sanitize(fullEditorHtml)"
              ></div>
            </TabPane>
            <TabPane key="2" title="Tab 2">
              <Textarea
                :auto-size="{ minRows: 13, maxRows: 13 }"
                v-model:model-value="fullEditorHtml"
              />
            </TabPane>
          </Tabs>
        </Col>

        <Col :span="12">
          <h3>简化编辑器内容</h3>
          <Tabs default-active-key="1">
            <TabPane key="1" title="Tab 1">
              <div
                class="content-preview"
                v-html="DOMPurify.sanitize(simpleEditorHtml)"
              ></div>
            </TabPane>
            <TabPane key="2" title="Tab 2">
              <Textarea
                :auto-size="{ minRows: 13, maxRows: 13 }"
                v-model:model-value="simpleEditorHtml"
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  </Page>
</template>

<style lang="scss" scoped>
.page-content {
  padding: 20px;
}

.editor-card {
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-buttons {
  display: flex;
  gap: 8px;
}

.preview-card {
  margin-bottom: 24px;
}

.preview-card h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.content-preview {
  min-height: 200px;
  max-height: 300px;
  padding: 16px;
  overflow-y: auto;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
}

.content-preview :deep(h1),
.content-preview :deep(h2),
.content-preview :deep(h3) {
  margin: 16px 0 8px;
}

.content-preview :deep(p) {
  margin: 8px 0;
  line-height: 1.6;
}

.content-preview :deep(table) {
  margin: 16px 0;
}

.content-preview :deep(table th),
.content-preview :deep(table td) {
  padding: 8px 12px;
}

.content-preview :deep(pre) {
  padding: 12px;
  margin: 16px 0;
  overflow-x: auto;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
}

.content-preview :deep(blockquote) {
  padding-left: 16px;
  margin: 16px 0;
  color: var(--el-text-color-regular);
  border-left: 4px solid var(--el-color-primary);
}

.usage-card :deep(.el-collapse-item__content) {
  padding-bottom: 16px;
}

.usage-card pre {
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  background-color: var(--el-fill-color-light);
  border-radius: 6px;
}

.usage-card pre code {
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.toolbar-explanation h4 {
  margin: 0 0 16px;
  color: var(--el-text-color-primary);
}

.toolbar-explanation h5 {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.toolbar-explanation ul {
  padding-left: 20px;
  margin: 8px 0 16px;
}

.toolbar-explanation ul li {
  margin: 4px 0;
  font-size: 13px;
  color: var(--el-text-color-regular);
}

.toolbar-explanation .note {
  margin: 8px 0 0;
  font-size: 12px;
  font-style: italic;
  color: var(--el-text-color-placeholder);
}

@media (width <= 768px) {
  .page-content {
    padding: 12px;
  }

  .card-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch !important;
  }

  .header-buttons {
    justify-content: center;
  }

  .preview-card :deep(.el-col) {
    margin-bottom: 16px;
  }
}
</style>

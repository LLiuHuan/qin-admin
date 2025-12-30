<!-- WangEditor 富文本编辑器 插件地址：https://www.wangeditor.com/ -->
<script setup lang="ts">
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';

import type { EditorProps } from './types';

import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue';

import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

import '@wangeditor/editor/dist/css/style.css';

defineOptions({ name: 'ArtWangEditor' });

const props = withDefaults(defineProps<EditorProps>(), {
  height: '500px',
  mode: 'default',
  placeholder: '请输入内容...',
  excludeKeys: () => ['fontFamily'],
});

const modelValue = defineModel<string>({ required: true });

// 编辑器实例
const editorRef = shallowRef<IDomEditor>();
// const userStore = useUserStore();

// 常量配置
const DEFAULT_UPLOAD_CONFIG = {
  maxFileSize: 3 * 1024 * 1024, // 3MB
  maxNumberOfFiles: 10,
  fieldName: 'file',
  allowedFileTypes: ['image/*'],
} as const;

// 计算属性：上传服务器地址
const uploadServer = computed(
  () =>
    props.uploadConfig?.server ||
    `${import.meta.env.VITE_API_URL}/api/common/upload/wangeditor`,
);

// 合并上传配置
const mergedUploadConfig = computed(() => ({
  ...DEFAULT_UPLOAD_CONFIG,
  ...props.uploadConfig,
}));

// 工具栏配置
const toolbarConfig = computed((): Partial<IToolbarConfig> => {
  const config: Partial<IToolbarConfig> = {};

  // 完全自定义工具栏
  if (props.toolbarKeys && props.toolbarKeys.length > 0) {
    config.toolbarKeys = props.toolbarKeys;
  }

  // 插入新工具
  if (props.insertKeys) {
    config.insertKeys = props.insertKeys;
  }

  // 排除工具
  if (props.excludeKeys && props.excludeKeys.length > 0) {
    config.excludeKeys = props.excludeKeys;
  }

  return config;
});

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: props.placeholder,
  MENU_CONF: {
    uploadImage: {
      fieldName: mergedUploadConfig.value.fieldName,
      maxFileSize: mergedUploadConfig.value.maxFileSize,
      maxNumberOfFiles: mergedUploadConfig.value.maxNumberOfFiles,
      allowedFileTypes: mergedUploadConfig.value.allowedFileTypes,
      server: uploadServer.value,
      headers:
        mergedUploadConfig.value.headers ||
        {
          // Authorization: `Bearer ${userStore.token}`,
        },
      onSuccess() {
        if (mergedUploadConfig.value?.onSuccess) {
          mergedUploadConfig.value.onSuccess();
        }
      },
      onError(file: File, err: any, res: any) {
        console.error('图片上传失败:', err, res);
        if (mergedUploadConfig.value?.onError) {
          mergedUploadConfig.value.onError(file, err, res);
        }
      },
    },
  },
};

// 编辑器创建回调
const onCreateEditor = (editor: IDomEditor) => {
  editorRef.value = editor;

  // 监听全屏事件
  editor.on('fullScreen', () => {
    console.log('编辑器进入全屏模式');
  });

  // 确保在编辑器创建后应用自定义图标
  applyCustomIcons();
};

// 应用自定义图标（带重试机制）
const applyCustomIcons = () => {
  let retryCount = 0;
  const maxRetries = 10;
  const retryDelay = 100;

  const tryApplyIcons = () => {
    const editor = editorRef.value;
    if (!editor) {
      if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(tryApplyIcons, retryDelay);
      }
      return;
    }

    // 获取当前编辑器的工具栏容器
    const editorContainer = editor
      .getEditableContainer()
      .closest('.editor-wrapper');
    if (!editorContainer) {
      if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(tryApplyIcons, retryDelay);
      }
      return;
    }

    const toolbar = editorContainer.querySelector('.w-e-toolbar');
    const toolbarButtons = editorContainer.querySelectorAll(
      '.w-e-bar-item button[data-menu-key]',
    );

    if (toolbar && toolbarButtons.length > 0) {
      return;
    }

    // 如果工具栏还没渲染完成，继续重试
    if (retryCount < maxRetries) {
      retryCount++;
      setTimeout(tryApplyIcons, retryDelay);
    } else {
      console.warn(
        '工具栏渲染超时，无法应用自定义图标 - 编辑器实例:',
        editor.id,
      );
    }
  };

  // 使用 requestAnimationFrame 确保在下一帧执行
  requestAnimationFrame(tryApplyIcons);
};

// 暴露编辑器实例和方法
defineExpose({
  /** 获取编辑器实例 */
  getEditor: () => editorRef.value,
  /** 设置编辑器内容 */
  setHtml: (html: string) => editorRef.value?.setHtml(html),
  /** 获取编辑器内容 */
  getHtml: () => editorRef.value?.getHtml(),
  /** 清空编辑器 */
  clear: () => editorRef.value?.clear(),
  /** 聚焦编辑器 */
  focus: () => editorRef.value?.focus(),
});

// 生命周期
onMounted(() => {
  // 图标替换已在 onCreateEditor 中处理
});

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) {
    editor.destroy();
  }
});
</script>

<template>
  <div class="editor-wrapper">
    <Toolbar
      class="editor-toolbar"
      :editor="editorRef"
      :mode="mode"
      :default-config="toolbarConfig"
    />
    <Editor
      :style="{ height, overflowY: 'hidden' }"
      v-model="modelValue"
      :mode="mode"
      :default-config="editorConfig"
      @on-created="onCreateEditor"
    />
  </div>
</template>

<style lang="scss">
$box-radius: var(--radius);

/*
* 深色主题
* 单页面移除深色主题 document.getElementsByTagName("html")[0].removeAttribute('class')
*/

$font-color: rgba(#fff, 0.85);

// 全屏容器 z-index 调整
.w-e-full-screen-container {
  z-index: 100 !important;
}

/* 编辑器容器 */
.editor-wrapper {
  @apply wh-full border border-solid border-[hsl(var(--border))];

  border-radius: $box-radius !important;

  .w-e-bar {
    border-radius: $box-radius $box-radius 0 0 !important;
  }

  .menu-item {
    @apply flex flex-col items-center;

    i {
      margin-right: 5px;
    }
  }

  /* 工具栏 */
  .editor-toolbar {
    @apply border-b border-solid border-[hsl(var(--border))];
  }

  /* 下拉选择框配置 */
  .w-e-select-list {
    @apply min-w-140px h-150px pt-5px py-10px border-none;

    border-radius: $box-radius;
  }

  /* 下拉选择框元素配置 */
  .w-e-select-list ul li {
    @apply mt-5px text-15px!;

    border-radius: $box-radius;
  }

  /* 下拉选择框 正文文字大小调整 */
  .w-e-select-list ul li:last-of-type {
    @apply text-16px!;
  }

  /* 下拉选择框 hover 样式调整 */
  .w-e-select-list ul li:hover {
    @apply bg-[hsl(var(--qin-gray-200))];
  }

  :root {
    /* 激活颜色 */
    --w-e-toolbar-active-bg-color: hsl(var(--foreground));

    /* toolbar 图标和文字颜色 */
    --w-e-toolbar-color: #000;

    /* 表格选中时候的边框颜色 */
    --w-e-textarea-selected-border-color: #ddd;

    /* 表格头背景颜色 */
    --w-e-textarea-slight-bg-color: hsl(var(--qin-gray-200));
  }

  /* 工具栏按钮样式 */
  .w-e-bar-item svg {
    @apply fill-[hsl(var(--qin-gray-800))];
  }

  .w-e-bar-item button {
    @apply text-[hsl(var(--qin-gray-800))];

    border-radius: $box-radius;
  }

  /* 工具栏 hover 按钮背景颜色 */
  .w-e-bar-item button:hover {
    @apply bg-[hsl(var(--qin-gray-200))];
  }

  /* 工具栏分割线 */
  .w-e-bar-divider {
    @apply mt-[10px] h-[20px] bg-[#ccc];
  }

  /* 工具栏菜单 */
  .w-e-bar-item-group .w-e-bar-item-menus-container {
    @apply min-w-120px py-10px border-none;

    border-radius: $box-radius;

    .w-e-bar-item {
      button {
        @apply my-5px w-full;
      }
    }
  }

  /* 代码块 */
  .w-e-text-container [data-slate-editor] pre > code {
    @apply px-1rem py-0.6rem bg-[hsl(var(--qin-gray-100))];

    border-radius: $box-radius;
  }

  /* 弹出框 */
  .w-e-drop-panel {
    @apply border-none;

    border-radius: $box-radius;
  }

  a {
    @apply text-[#318ef4];
  }

  .w-e-text-container {
    strong,
    b {
      @apply font-bold;
    }

    i,
    em {
      @apply font-italic;
    }
  }

  /* 表格样式优化 */
  .w-e-text-container [data-slate-editor] .table-container th {
    @apply border-r-none;
  }

  .w-e-text-container [data-slate-editor] .table-container th:last-of-type {
    border-right: 1px solid #ccc !important;
  }

  /* 引用 */
  .w-e-text-container [data-slate-editor] blockquote {
    @apply bg-[hsl(var(--qin-gray-200))];

    border-left: 4px solid hsl(var(--qin-gray-300));
  }

  /* 输入区域弹出 bar  */
  .w-e-hover-bar {
    border-radius: $box-radius;
  }

  /* 超链接弹窗 */
  .w-e-modal {
    @apply border-none;

    border-radius: $box-radius;
  }

  /* 图片样式调整 */
  .w-e-text-container [data-slate-editor] .w-e-selected-image-container {
    overflow: inherit;

    &:hover {
      border: 0;
    }

    img {
      border: 1px solid transparent;
      transition: border 0.3s;

      &:hover {
        border: 1px solid #318ef4 !important;
      }
    }

    .w-e-image-dragger {
      width: 12px;
      height: 12px;
      background-color: #318ef4;
      border: 2px solid #fff;
      border-radius: $box-radius;
    }

    .left-top {
      @apply left-[-6px] top-[-6px];
    }

    .right-top {
      @apply right-[-6px] top-[-6px];
    }

    .left-bottom {
      @apply bottom-[-6px] left-[-6px];
    }

    .right-bottom {
      @apply bottom-[-6px] right-[-6px];
    }
  }
}

/* 覆盖element-plus默认深色背景色 */
html.dark {
  // element-plus
  --el-bg-color: var(--default-box-color);
  --el-text-color-regular: #{$font-color};

  // 富文本编辑器
  // 工具栏背景颜色
  --w-e-toolbar-bg-color: #18191c;
  // 输入区域背景颜色
  --w-e-textarea-bg-color: #090909;
  // 工具栏文字颜色
  --w-e-toolbar-color: hsl(var(--qin-gray-600));
  // 选中菜单颜色
  --w-e-toolbar-active-bg-color: #25262b;
  // 弹窗边框颜色
  --w-e-toolbar-border-color: var(--border-dashed);
  // 分割线颜色
  --w-e-textarea-border-color: var(--border-dashed);
  // 链接输入框边框颜色
  --w-e-modal-button-border-color: var(--border-dashed);
  // 表格头颜色
  --w-e-textarea-slight-bg-color: #090909;
  // 按钮背景颜色
  --w-e-modal-button-bg-color: #090909;
  // hover toolbar 背景颜色
  --w-e-toolbar-active-color: hsl(var(--qin-gray-800));
}

.dark {
  .page-content .article-list .item .left .outer > div {
    border-right-color: hsl(var(--border)) !important;
  }

  // 富文本编辑器
  .editor-wrapper {
    *:not(pre code *) {
      color: inherit !important;
    }

    .w-e-text-container [data-slate-editor] .table-container th:last-of-type {
      border-right: 1px solid var(--border-dashed) !important;
    }

    .w-e-modal {
      background-color: hsl(var(--popover));
    }
  }
  // 分隔线
  .w-e-bar-divider {
    background-color: hsl(var(--qin-gray-300)) !important;
  }

  .w-e-select-list,
  .w-e-drop-panel,
  .w-e-bar-item-group .w-e-bar-item-menus-container,
  .w-e-text-container [data-slate-editor] pre > code {
    border: 1px solid hsl(var(--border)) !important;
  }

  // 下拉选择框
  .w-e-select-list {
    background-color: hsl(var(--popover)) !important;
  }

  /* 下拉选择框 hover 样式调整 */
  .w-e-select-list ul li:hover,
    /* 工具栏 hover 按钮背景颜色 */
    .w-e-bar-item button:hover {
    background-color: #090909 !important;
  }

  /* 代码块 */
  .w-e-text-container [data-slate-editor] pre > code {
    text-shadow: none !important;
    background-color: #25262b !important;
  }

  /* 引用 */
  .w-e-text-container [data-slate-editor] blockquote {
    background-color: var(--art-color);
    border-left: 4px solid var(--border-dashed) !important;
  }
}
</style>

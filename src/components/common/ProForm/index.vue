<template>
  <a-form
    v-bind="formProps"
    :model="formData"
    :rules="formRules"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <!-- 表单分组 -->
    <template v-if="grouped">
      <a-collapse v-model:activeKey="activeKeys">
        <a-collapse-panel
          v-for="group in schema.groups"
          :key="group.key"
          :header="group.title"
        >
          <a-row :gutter="16">
            <a-col
              v-for="item in group.items"
              :key="item.field"
              :span="item.span || 12"
            >
              <a-form-item
                :label="item.label"
                :name="item.field"
                :rules="item.rules"
              >
                <component
                  :is="getComponent(item.type)"
                  v-bind="item.props"
                  v-model:value="formData[item.field]"
                  :placeholder="item.placeholder || `请输入${item.label}`"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </template>

    <!-- 普通布局 -->
    <template v-else>
      <a-row :gutter="16">
        <a-col
          v-for="item in schema.items"
          :key="item.field"
          :span="getSpan(item.span, layout)"
        >
          <a-form-item
            :label="item.label"
            :name="item.field"
            :rules="item.rules"
          >
            <component
              :is="getComponent(item.type)"
              v-bind="item.props"
              v-model:value="formData[item.field]"
              :placeholder="item.placeholder || `请输入${item.label}`"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </template>

    <!-- 表单操作 -->
    <a-form-item :wrapper-col="{ offset: labelCol.span, span: wrapperCol.span }">
      <a-space>
        <a-button type="primary" html-type="submit" :loading="submitting">
          提交
        </a-button>
        <a-button @click="handleReset">重置</a-button>
        <a-button @click="handleExpand" v-if="showExpand">
          {{ expanded ? '收起' : '展开' }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import type { PropType } from 'vue'
import type { ProFormSchema, ProFormProps, ProFormInstance } from './types'

// Props
const props = defineProps({
  // 表单 schema
  schema: {
    type: Object as PropType<ProFormSchema>,
    required: true,
  },
  // 初始值
  initialValues: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  // 布局
  layout: {
    type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
    default: 'horizontal',
  },
  // 标签宽度
  labelCol: {
    type: Object as PropType<any>,
    default: () => ({ span: 4 }),
  },
  // 内容宽度
  wrapperCol: {
    type: Object as PropType<any>,
    default: () => ({ span: 16 }),
  },
  // 分组显示
  grouped: {
    type: Boolean,
    default: false,
  },
  // 显示展开/收起
  showExpand: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits<{
  (e: 'finish', values: any): void
  (e: 'reset'): void
  (e: 'expand', expanded: boolean): void
}>()

// 表单数据
const formData = reactive<any>({})

// 表单验证规则
const formRules = computed(() => {
  const rules: any = {}
  const items = props.grouped
    ? props.schema.groups?.flatMap((g) => g.items) || []
    : props.schema.items || []

  items.forEach((item) => {
    if (item.rules) {
      rules[item.field] = item.rules
    }
  })

  return rules
})

// 表单属性
const formProps = computed<ProFormProps>(() => ({
  layout: props.layout,
  labelCol: props.labelCol,
  wrapperCol: props.wrapperCol,
}))

// 展开状态
const expanded = ref(false)
const activeKeys = ref<string[]>([])

// 提交状态
const submitting = ref(false)

// 获取组件
const getComponent = (type: string) => {
  const componentMap: Record<string, string> = {
    input: 'a-input',
    password: 'a-input-password',
    number: 'a-input-number',
    textarea: 'a-textarea',
    select: 'a-select',
    radio: 'a-radio-group',
    checkbox: 'a-checkbox-group',
    date: 'a-date-picker',
    time: 'a-time-picker',
    switch: 'a-switch',
    slider: 'a-slider',
    cascader: 'a-cascader',
    treeSelect: 'a-tree-select',
  }

  return componentMap[type] || 'a-input'
}

// 获取列宽
const getSpan = (span?: number, layout?: string) => {
  if (layout === 'vertical') {
    return 24
  }
  return span || 12
}

// 初始化表单数据
onMounted(() => {
  const items = props.grouped
    ? props.schema.groups?.flatMap((g) => g.items) || []
    : props.schema.items || []

  items.forEach((item) => {
    if (props.initialValues && item.field in props.initialValues) {
      formData[item.field] = props.initialValues[item.field]
    } else {
      formData[item.field] = item.initialValue || undefined
    }
  })
})

// 提交处理
const handleFinish = async (values: any) => {
  submitting.value = true
  try {
    emit('finish', values)
    message.success('提交成功')
  } catch (error: any) {
    message.error(error.message || '提交失败')
  } finally {
    submitting.value = false
  }
}

// 提交失败处理
const handleFinishFailed = ({ values, errorFields }: any) => {
  if (errorFields && errorFields.length > 0) {
    message.error('表单验证失败')
  }
}

// 重置处理
const handleReset = () => {
  Object.keys(formData).forEach((key) => {
    const item = props.schema.items?.find((i) => i.field === key)
    formData[key] = item?.initialValue || undefined
  })
  emit('reset')
  message.success('已重置')
}

// 展开/收起处理
const handleExpand = () => {
  expanded.value = !expanded.value
  emit('expand', expanded.value)
}

// 暴露方法
defineExpose<ProFormInstance>({
  validate: async () => {
    // 实现验证逻辑
    return formData
  },
  resetFields: handleReset,
  getFieldsValue: () => ({ ...formData }),
  setFieldsValue: (values: any) => {
    Object.assign(formData, values)
  },
  submit: () => {
    handleFinish(formData)
  },
})
</script>

<style scoped lang="scss">
.pro-form {
  :deep(.ant-form-item) {
    margin-bottom: 16px;
  }

  :deep(.ant-collapse) {
    margin-bottom: 16px;

    .ant-collapse-content-box {
      padding: 12px;
    }
  }
}
</style>

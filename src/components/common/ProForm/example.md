# ProForm 使用示例

## 基础用法

```vue
<template>
  <ProForm
    :schema="formSchema"
    :initial-values="initialValues"
    @finish="handleSubmit"
    @reset="handleReset"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProForm from '@/components/common/ProForm'
import type { ProFormSchema } from '@/components/common/ProForm'

const initialValues = {
  username: '',
  email: '',
}

const formSchema: ProFormSchema = {
  items: [
    {
      field: 'username',
      label: '用户名',
      type: 'input',
      rules: [{ required: true, message: '请输入用户名' }],
    },
    {
      field: 'email',
      label: '邮箱',
      type: 'input',
      rules: [
        { required: true, message: '请输入邮箱' },
        { type: 'email', message: '邮箱格式不正确' },
      ],
    },
  ],
}

const handleSubmit = (values: any) => {
  console.log('提交', values)
}

const handleReset = () => {
  console.log('重置')
}
</script>
```

## 多列布局

```vue
<template>
  <ProForm
    :schema="formSchema"
    layout="horizontal"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 10 }"
  />
</template>

<script setup lang="ts">
const formSchema: ProFormSchema = {
  items: [
    { field: 'name', label: '姓名', type: 'input', span: 8 },
    { field: 'age', label: '年龄', type: 'number', span: 8 },
    { field: 'email', label: '邮箱', type: 'input', span: 8 },
  ],
}
</script>
```

## 分组表单

```vue
<template>
  <ProForm
    :schema="formSchema"
    :grouped="true"
    @finish="handleSubmit"
  />
</template>

<script setup lang="ts">
const formSchema: ProFormSchema = {
  groups: [
    {
      key: 'basic',
      title: '基本信息',
      items: [
        { field: 'name', label: '姓名', type: 'input' },
        { field: 'age', label: '年龄', type: 'number' },
      ],
    },
    {
      key: 'contact',
      title: '联系方式',
      items: [
        { field: 'phone', label: '电话', type: 'input' },
        { field: 'email', label: '邮箱', type: 'input' },
      ],
    },
  ],
}
</script>
```

## 表单验证

```vue
<template>
  <ProForm
    ref="formRef"
    :schema="formSchema"
    @finish="handleSubmit"
  />

  <a-button @click="handleValidate">验证表单</a-button>
  <a-button @click="handleReset">重置表单</a-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ProFormInstance } from '@/components/common/ProForm'

const formRef = ref<ProFormInstance>()

const formSchema: ProFormSchema = {
  items: [
    {
      field: 'username',
      label: '用户名',
      type: 'input',
      rules: [
        { required: true, message: '请输入用户名' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符' },
      ],
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
      rules: [
        { required: true, message: '请输入密码' },
        { min: 6, message: '密码至少 6 位' },
      ],
    },
  ],
}

const handleValidate = async () => {
  try {
    const values = await formRef.value?.validate()
    console.log('验证通过', values)
  } catch (error) {
    console.log('验证失败', error)
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
}

const handleSubmit = (values: any) => {
  console.log('提交', values)
}
</script>
```

## 动态表单

```vue
<template>
  <ProForm
    :schema="formSchema"
    :show-expand="true"
    @expand="handleExpand"
  />
</template>

<script setup lang="ts">
const formSchema: ProFormSchema = {
  items: [
    { field: 'field1', label: '字段 1', type: 'input' },
    { field: 'field2', label: '字段 2', type: 'input' },
    { field: 'field3', label: '字段 3', type: 'input', hidden: true },
    { field: 'field4', label: '字段 4', type: 'input', hidden: true },
  ],
}

const handleExpand = (expanded: boolean) => {
  console.log('展开状态', expanded)
}
</script>
```

## 表单方法

```vue
<template>
  <ProForm
    ref="formRef"
    :schema="formSchema"
    :initial-values="initialValues"
  />

  <a-button @click="setValues">设置值</a-button>
  <a-button @click="getValues">获取值</a-button>
  <a-button @click="submitForm">提交</a-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ProFormInstance } from '@/components/common/ProForm'

const formRef = ref<ProFormInstance>()

const initialValues = {
  username: 'admin',
  email: 'admin@example.com',
}

const setValues = () => {
  formRef.value?.setFieldsValue({
    username: 'new_admin',
    email: 'new@example.com',
  })
}

const getValues = () => {
  const values = formRef.value?.getFieldsValue()
  console.log('表单值', values)
}

const submitForm = () => {
  formRef.value?.submit()
}
</script>
```

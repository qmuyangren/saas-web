/**
 * ProForm 类型定义
 */

import type { Rule } from 'async-validator'

/**
 * 表单项类型
 */
export type FormItemType =
  | 'input'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'switch'
  | 'slider'
  | 'cascader'
  | 'treeSelect'

/**
 * 表单项配置
 */
export interface FormItemSchema {
  /** 字段名 */
  field: string
  /** 标签 */
  label: string
  /** 类型 */
  type: FormItemType
  /** 占位符 */
  placeholder?: string
  /** 初始值 */
  initialValue?: any
  /** 验证规则 */
  rules?: Rule[]
  /** 组件属性 */
  props?: Record<string, any>
  /** 列宽 (1-24) */
  span?: number
  /** 隐藏 */
  hidden?: boolean
  /** 禁用 */
  disabled?: boolean
}

/**
 * 表单分组配置
 */
export interface FormGroupSchema {
  /** 分组 key */
  key: string
  /** 分组标题 */
  title: string
  /** 表单项列表 */
  items: FormItemSchema[]
}

/**
 * 表单 Schema
 */
export interface ProFormSchema {
  /** 表单项列表 */
  items?: FormItemSchema[]
  /** 表单分组 */
  groups?: FormGroupSchema[]
}

/**
 * 表单属性
 */
export interface ProFormProps {
  /** 布局方式 */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** 标签配置 */
  labelCol?: any
  /** 内容配置 */
  wrapperCol?: any
  /** 表单数据 */
  model?: Record<string, any>
  /** 验证规则 */
  rules?: Record<string, Rule[]>
}

/**
 * 表单实例方法
 */
export interface ProFormInstance {
  /** 验证表单 */
  validate: () => Promise<any>
  /** 重置表单 */
  resetFields: () => void
  /** 获取表单值 */
  getFieldsValue: () => Record<string, any>
  /** 设置表单值 */
  setFieldsValue: (values: Record<string, any>) => void
  /** 提交表单 */
  submit: () => void
}

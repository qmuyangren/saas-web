import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/components/common/AppButton/index.vue'

describe('AppButton', () => {
  it('renders default slot content', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies type prop', () => {
    const wrapper = mount(AppButton, {
      props: { type: 'primary' },
    })
    expect(wrapper.classes()).toContain('ant-btn-primary')
  })
})

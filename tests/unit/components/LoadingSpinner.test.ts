import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders properly', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })

  it('applies custom class when provided', () => {
    const wrapper = mount(LoadingSpinner, {
      attrs: {
        class: 'custom-class'
      }
    })
    expect(wrapper.classes()).toContain('custom-class')
  })

  it('has spinner element with correct size', () => {
    const wrapper = mount(LoadingSpinner)
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
    expect(spinner.classes()).toContain('w-12')
    expect(spinner.classes()).toContain('h-12')
  })

  it('shows text when provided', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { text: 'Loading...' }
    })
    expect(wrapper.text()).toContain('Loading...')
  })
})
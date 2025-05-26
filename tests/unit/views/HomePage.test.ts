import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

// Mock the section components
vi.mock('@/components/sections/FeaturesSection.vue', () => ({
  default: { template: '<div data-testid="features-section">Features Section</div>' }
}))

vi.mock('@/components/sections/FAQSection.vue', () => ({
  default: { template: '<div data-testid="faq-section">FAQ Section</div>' }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/video-thumbnail-generator', component: { template: '<div>Video</div>' } },
    { path: '/lottie-thumbnail-generator', component: { template: '<div>Lottie</div>' } },
    { path: '/base64-image-converter', component: { template: '<div>Base64</div>' } },
    { path: '/text-thumbnail-generator', component: { template: '<div>Text</div>' } },
    { path: '/watermark-tool', component: { template: '<div>Watermark</div>' } }
  ]
})

describe('HomePage', () => {
  it('renders hero section with title and description', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain('ThumbGen')
    expect(wrapper.text()).toContain('Generate beautiful thumbnails')
  })

  it('renders all tool cards', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain('Video Thumbnail Generator')
    expect(wrapper.text()).toContain('Lottie/TGS Thumbnail')
    expect(wrapper.text()).toContain('Base64 Image Converter')
    expect(wrapper.text()).toContain('Text Thumbnail Generator')
    expect(wrapper.text()).toContain('Watermark Tool')
  })

  it('has correct router links for all tools', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })

    const links = wrapper.findAllComponents({ name: 'RouterLink' })
    const expectedRoutes = [
      '/video-thumbnail-generator',
      '/lottie-thumbnail-generator',
      '/base64-image-converter',
      '/text-thumbnail-generator',
      '/watermark-tool'
    ]

    expectedRoutes.forEach(route => {
      expect(links.some(link => link.props('to') === route)).toBe(true)
    })
  })

  it('renders features section', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('[data-testid="features-section"]').exists()).toBe(true)
  })

  it('renders FAQ section', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('[data-testid="faq-section"]').exists()).toBe(true)
  })

  it('has tools section with correct id', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('#tools').exists()).toBe(true)
  })

  it('displays tool descriptions correctly', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain('Extract perfect frames from videos')
    expect(wrapper.text()).toContain('Generate thumbnails from Lottie animations')
    expect(wrapper.text()).toContain('Convert images to base64 for progressive loading')
    expect(wrapper.text()).toContain('Create stunning text-based thumbnails')
    expect(wrapper.text()).toContain('Add custom watermarks to protect your images')
  })

  it('has proper heading structure', () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.findAll('h3').length).toBeGreaterThan(0)
  })
})
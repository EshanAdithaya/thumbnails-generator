import { describe, it, expect } from 'vitest'
import { 
  calculateAspectRatio, 
  generateBase64Preview, 
  validateImageFile,
  getImageDimensions 
} from '@/utils/imageProcessing'

describe('imageProcessing utilities', () => {
  describe('calculateAspectRatio', () => {
    it('calculates aspect ratio correctly', () => {
      expect(calculateAspectRatio(1920, 1080)).toBeCloseTo(56.25, 2)
      expect(calculateAspectRatio(1080, 1080)).toBeCloseTo(100, 2)
      expect(calculateAspectRatio(1080, 1920)).toBeCloseTo(177.78, 2)
    })

    it('handles zero dimensions', () => {
      expect(calculateAspectRatio(0, 100)).toBe(0)
      expect(calculateAspectRatio(100, 0)).toBe(0)
      expect(calculateAspectRatio(0, 0)).toBe(0)
    })

    it('handles decimal dimensions', () => {
      expect(calculateAspectRatio(100.5, 50.25)).toBeCloseTo(50, 2)
    })
  })

  describe('validateImageFile', () => {
    it('validates image files correctly', () => {
      const validImageFile = new File([''], 'test.jpg', { type: 'image/jpeg' })
      const invalidFile = new File([''], 'test.txt', { type: 'text/plain' })
      
      expect(validateImageFile(validImageFile)).toBe(true)
      expect(validateImageFile(invalidFile)).toBe(false)
    })

    it('accepts various image formats', () => {
      const jpegFile = new File([''], 'test.jpg', { type: 'image/jpeg' })
      const pngFile = new File([''], 'test.png', { type: 'image/png' })
      const webpFile = new File([''], 'test.webp', { type: 'image/webp' })
      const gifFile = new File([''], 'test.gif', { type: 'image/gif' })
      
      expect(validateImageFile(jpegFile)).toBe(true)
      expect(validateImageFile(pngFile)).toBe(true)
      expect(validateImageFile(webpFile)).toBe(true)
      expect(validateImageFile(gifFile)).toBe(true)
    })
  })

  describe('generateBase64Preview', () => {
    it('generates base64 preview with correct format', async () => {
      const mockCanvas = document.createElement('canvas')
      mockCanvas.width = 4
      mockCanvas.height = 4
      
      const result = await generateBase64Preview(mockCanvas)
      expect(result).toMatch(/^data:image\/jpeg;base64,/)
    })

    it('handles different quality settings', async () => {
      const mockCanvas = document.createElement('canvas')
      mockCanvas.width = 4
      mockCanvas.height = 4
      
      const highQuality = await generateBase64Preview(mockCanvas, 100)
      const lowQuality = await generateBase64Preview(mockCanvas, 10)
      
      expect(highQuality).toMatch(/^data:image\/jpeg;base64,/)
      expect(lowQuality).toMatch(/^data:image\/jpeg;base64,/)
    })
  })

  describe('getImageDimensions', () => {
    it('returns dimensions from image file', async () => {
      const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
      
      // Since the mocks are already set up in setup.ts, we just need to use them
      const dimensionsPromise = getImageDimensions(mockFile)
      
      // Wait a bit for the async operations
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const dimensions = await dimensionsPromise
      expect(dimensions.width).toBe(100)
      expect(dimensions.height).toBe(100)
    })
  })
})
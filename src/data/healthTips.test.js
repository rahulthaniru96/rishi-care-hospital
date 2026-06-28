import { describe, it, expect } from 'vitest'
import { healthTips } from './healthTips'

describe('healthTips data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(healthTips)).toBe(true)
    expect(healthTips.length).toBeGreaterThan(0)
  })

  it('each tip has required fields', () => {
    healthTips.forEach(tip => {
      expect(tip).toHaveProperty('slug')
      expect(tip).toHaveProperty('title')
      expect(tip).toHaveProperty('summary')
      expect(tip).toHaveProperty('tips')
      expect(tip).toHaveProperty('note')
    })
  })

  it('each tip has a unique slug', () => {
    const slugs = healthTips.map(t => t.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('tips array contains objects with icon and text', () => {
    healthTips.forEach(tip => {
      expect(tip.tips.length).toBeGreaterThan(0)
      tip.tips.forEach(t => {
        expect(t).toHaveProperty('icon')
        expect(t).toHaveProperty('text')
        expect(typeof t.text).toBe('string')
      })
    })
  })

  it('tip icons are valid emoji types', () => {
    const validIcons = ['✅', '❌', '⚠️']
    healthTips.forEach(tip => {
      tip.tips.forEach(t => {
        expect(validIcons).toContain(t.icon)
      })
    })
  })
})

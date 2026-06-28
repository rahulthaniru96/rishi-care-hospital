import { describe, it, expect } from 'vitest'
import { conditions } from './conditions'

describe('conditions data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(conditions)).toBe(true)
    expect(conditions.length).toBeGreaterThan(0)
  })

  it('each condition has required fields', () => {
    conditions.forEach(c => {
      expect(c).toHaveProperty('slug')
      expect(c).toHaveProperty('title')
      expect(c).toHaveProperty('overview')
      expect(c).toHaveProperty('symptoms')
      expect(c).toHaveProperty('remedies')
    })
  })

  it('each condition has a unique slug', () => {
    const slugs = conditions.map(c => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('slugs are URL-safe', () => {
    conditions.forEach(c => {
      expect(c.slug).toMatch(/^[a-z0-9-]+$/)
    })
  })

  it('symptoms and remedies are non-empty arrays of strings', () => {
    conditions.forEach(c => {
      expect(c.symptoms.length).toBeGreaterThan(0)
      expect(c.remedies.length).toBeGreaterThan(0)
      c.symptoms.forEach(s => expect(typeof s).toBe('string'))
      c.remedies.forEach(r => expect(typeof r).toBe('string'))
    })
  })

  it('contains expected conditions', () => {
    const slugs = conditions.map(c => c.slug)
    expect(slugs).toContain('diabetes')
    expect(slugs).toContain('thyroid')
    expect(slugs).toContain('asthma')
  })
})

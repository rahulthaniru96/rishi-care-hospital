import { describe, it, expect } from 'vitest'
import { services } from './services'

describe('services data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(services)).toBe(true)
    expect(services.length).toBeGreaterThan(0)
  })

  it('each service has required fields', () => {
    services.forEach(s => {
      expect(s).toHaveProperty('id')
      expect(s).toHaveProperty('title')
      expect(s).toHaveProperty('description')
      expect(s).toHaveProperty('icon')
    })
  })

  it('each service has a unique id', () => {
    const ids = services.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('contains core hospital services', () => {
    const titles = services.map(s => s.title)
    expect(titles).toContain('OP Services')
    expect(titles).toContain('IP Services')
    expect(titles).toContain('ECG')
    expect(titles).toContain('Laboratory')
    expect(titles).toContain('Pharmacy')
  })
})

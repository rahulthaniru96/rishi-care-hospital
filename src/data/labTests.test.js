import { describe, it, expect } from 'vitest'
import { labTests } from './labTests'

describe('labTests data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(labTests)).toBe(true)
    expect(labTests.length).toBeGreaterThan(0)
  })

  it('each test has required fields', () => {
    labTests.forEach(test => {
      expect(test).toHaveProperty('id')
      expect(test).toHaveProperty('name')
      expect(test).toHaveProperty('description')
      expect(typeof test.name).toBe('string')
      expect(typeof test.description).toBe('string')
    })
  })

  it('each test has a unique id', () => {
    const ids = labTests.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('contains expected lab tests', () => {
    const names = labTests.map(t => t.name)
    expect(names.some(n => n.includes('CBC'))).toBe(true)
    expect(names.some(n => n.includes('HbA1c'))).toBe(true)
  })
})

import { describe, it, expect } from 'vitest'
import { doctors } from './doctors'

describe('doctors data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(doctors)).toBe(true)
    expect(doctors.length).toBeGreaterThan(0)
  })

  it('each doctor has required fields', () => {
    doctors.forEach(doc => {
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('name')
      expect(doc).toHaveProperty('qualifications')
      expect(doc).toHaveProperty('specialization')
      expect(doc).toHaveProperty('specialties')
      expect(doc).toHaveProperty('photo')
      expect(doc).toHaveProperty('available')
    })
  })

  it('each doctor has a unique id', () => {
    const ids = doctors.map(d => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('specialties is a non-empty array for each doctor', () => {
    doctors.forEach(doc => {
      expect(Array.isArray(doc.specialties)).toBe(true)
      expect(doc.specialties.length).toBeGreaterThan(0)
    })
  })

  it('photo URLs are non-empty strings', () => {
    doctors.forEach(doc => {
      expect(typeof doc.photo).toBe('string')
      expect(doc.photo.length).toBeGreaterThan(0)
    })
  })
})

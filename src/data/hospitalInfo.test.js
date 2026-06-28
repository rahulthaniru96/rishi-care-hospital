import { describe, it, expect } from 'vitest'
import { hospitalInfo } from './hospitalInfo'

describe('hospitalInfo data', () => {
  it('has all required fields', () => {
    expect(hospitalInfo).toHaveProperty('name')
    expect(hospitalInfo).toHaveProperty('tagline')
    expect(hospitalInfo).toHaveProperty('phone')
    expect(hospitalInfo).toHaveProperty('whatsapp')
    expect(hospitalInfo).toHaveProperty('address')
    expect(hospitalInfo).toHaveProperty('hours')
    expect(hospitalInfo).toHaveProperty('googleMapsUrl')
    expect(hospitalInfo).toHaveProperty('googlePlaceId')
    expect(hospitalInfo).toHaveProperty('googleReviewLink')
    expect(hospitalInfo).toHaveProperty('services')
  })

  it('hospital name is correct', () => {
    expect(hospitalInfo.name).toBe('Rishi Care Hospital')
  })

  it('phone number is a valid Indian number', () => {
    expect(hospitalInfo.phone).toMatch(/^\+91\s?\d{10}$/)
  })

  it('hours array covers weekdays, sunday, and emergency', () => {
    expect(hospitalInfo.hours.length).toBeGreaterThanOrEqual(3)
    const days = hospitalInfo.hours.map(h => h.day)
    expect(days.some(d => d.includes('Monday'))).toBe(true)
    expect(days.some(d => d.includes('Sunday'))).toBe(true)
    expect(days.some(d => d.includes('Emergency'))).toBe(true)
  })

  it('services list is non-empty', () => {
    expect(hospitalInfo.services.length).toBeGreaterThan(0)
  })

  it('google maps URL is a valid URL', () => {
    expect(hospitalInfo.googleMapsUrl).toMatch(/^https?:\/\//)
  })
})

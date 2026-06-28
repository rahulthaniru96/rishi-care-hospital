import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import HealthTipDetail from './HealthTipDetail'

const renderWithSlug = (slug) =>
  render(
    <MemoryRouter initialEntries={[`/health-tips/${slug}`]}>
      <Routes>
        <Route path="/health-tips/:slug" element={<HealthTipDetail />} />
      </Routes>
    </MemoryRouter>
  )

describe('HealthTipDetail page', () => {
  it('renders tip title for valid slug', () => {
    renderWithSlug('diabetes-awareness')
    expect(screen.getByRole('heading', { name: 'Diabetes Awareness' })).toBeInTheDocument()
  })

  it('renders summary', () => {
    renderWithSlug('diabetes-awareness')
    expect(screen.getByText(/Know the signs early/)).toBeInTheDocument()
  })

  it('renders all tip items', () => {
    renderWithSlug('diabetes-awareness')
    expect(screen.getByText(/fasting blood sugar/)).toBeInTheDocument()
    expect(screen.getByText(/Walk 30 minutes/)).toBeInTheDocument()
  })

  it('renders tip category labels', () => {
    renderWithSlug('diabetes-awareness')
    expect(screen.getAllByText('Recommended').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Avoid').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Important').length).toBeGreaterThan(0)
  })

  it('renders medical note when present', () => {
    renderWithSlug('diabetes-awareness')
    expect(screen.getByText('Medical Note')).toBeInTheDocument()
    expect(screen.getByText(/HbA1c testing/)).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    renderWithSlug('diabetes-awareness')
    expect(screen.getByText('Need Professional Medical Advice?')).toBeInTheDocument()
  })

  it('shows not-found state for invalid slug', () => {
    renderWithSlug('nonexistent-tip')
    expect(screen.getByText('Health Tip Not Found')).toBeInTheDocument()
    expect(screen.getByText(/Back to Health Tips/)).toBeInTheDocument()
  })

  it('back link points to health tips list', () => {
    renderWithSlug('diabetes-awareness')
    const backLink = screen.getByText(/Back to Health Tips/).closest('a')
    expect(backLink).toHaveAttribute('href', '/health-tips')
  })
})

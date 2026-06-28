import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ConditionDetail from './ConditionDetail'

const renderWithSlug = (slug) =>
  render(
    <MemoryRouter initialEntries={[`/conditions/${slug}`]}>
      <Routes>
        <Route path="/conditions/:slug" element={<ConditionDetail />} />
      </Routes>
    </MemoryRouter>
  )

describe('ConditionDetail page', () => {
  it('renders condition title for a valid slug', () => {
    renderWithSlug('diabetes')
    expect(screen.getByRole('heading', { name: 'Diabetes' })).toBeInTheDocument()
  })

  it('renders overview section', () => {
    renderWithSlug('diabetes')
    expect(screen.getByText(/Overview/)).toBeInTheDocument()
    expect(screen.getByText(/chronic condition/)).toBeInTheDocument()
  })

  it('renders symptoms list', () => {
    renderWithSlug('diabetes')
    expect(screen.getByText(/🤒 Symptoms/)).toBeInTheDocument()
    expect(screen.getAllByText('Frequent urination').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Excessive thirst')).toBeInTheDocument()
  })

  it('renders remedies list', () => {
    renderWithSlug('diabetes')
    expect(screen.getByText(/Home Remedies/)).toBeInTheDocument()
    expect(screen.getByText(/low-glycemic foods/)).toBeInTheDocument()
  })

  it('renders medical disclaimer', () => {
    renderWithSlug('diabetes')
    expect(screen.getByText(/Medical Disclaimer/)).toBeInTheDocument()
  })

  it('renders CTA with call and WhatsApp links', () => {
    renderWithSlug('diabetes')
    expect(screen.getByText('Experiencing These Symptoms?')).toBeInTheDocument()
    const callLink = screen.getByText(/Call Hospital/).closest('a')
    expect(callLink).toHaveAttribute('href', expect.stringContaining('tel:'))
    const waLink = screen.getByText(/WhatsApp/).closest('a')
    expect(waLink).toHaveAttribute('href', expect.stringContaining('wa.me'))
  })

  it('shows not-found state for invalid slug', () => {
    renderWithSlug('nonexistent-condition')
    expect(screen.getByText('Condition Not Found')).toBeInTheDocument()
    expect(screen.getByText(/Back to Conditions/)).toBeInTheDocument()
  })

  it('has back link to conditions list', () => {
    renderWithSlug('diabetes')
    const backLink = screen.getByText(/All Conditions/).closest('a')
    expect(backLink).toHaveAttribute('href', '/conditions')
  })
})

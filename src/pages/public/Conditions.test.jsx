import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Conditions from './Conditions'

const renderConditions = () =>
  render(
    <BrowserRouter>
      <Conditions />
    </BrowserRouter>
  )

describe('Conditions page', () => {
  it('renders page heading', () => {
    renderConditions()
    expect(screen.getByRole('heading', { name: 'Expertise Across Specialties' })).toBeInTheDocument()
  })

  it('renders all conditions', () => {
    renderConditions()
    expect(screen.getByText('Diabetes')).toBeInTheDocument()
    expect(screen.getByText('Thyroid')).toBeInTheDocument()
    expect(screen.getByText('Asthma')).toBeInTheDocument()
    expect(screen.getByText('Arthritis')).toBeInTheDocument()
    expect(screen.getByText('Kidney Stones')).toBeInTheDocument()
    expect(screen.getByText('Viral Fever')).toBeInTheDocument()
  })

  it('shows symptom and remedy counts', () => {
    renderConditions()
    const symptomBadges = screen.getAllByText(/Symptoms/)
    const remedyBadges = screen.getAllByText(/Remedies/)
    expect(symptomBadges.length).toBeGreaterThan(0)
    expect(remedyBadges.length).toBeGreaterThan(0)
  })

  it('each condition links to its detail page', () => {
    renderConditions()
    const diabetesLink = screen.getByText('Diabetes').closest('a')
    expect(diabetesLink).toHaveAttribute('href', '/conditions/diabetes')
  })

  it('renders fallback CTA section', () => {
    renderConditions()
    expect(screen.getByText("Don't See Your Condition?")).toBeInTheDocument()
  })
})

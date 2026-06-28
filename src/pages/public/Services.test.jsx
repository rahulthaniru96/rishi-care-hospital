import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Services from './Services'

const renderServices = () =>
  render(
    <BrowserRouter>
      <Services />
    </BrowserRouter>
  )

describe('Services page', () => {
  it('renders page heading', () => {
    renderServices()
    expect(screen.getByRole('heading', { name: 'Our Medical Services' })).toBeInTheDocument()
  })

  it('renders all services', () => {
    renderServices()
    expect(screen.getByText('OP Services')).toBeInTheDocument()
    expect(screen.getByText('IP Services')).toBeInTheDocument()
    expect(screen.getByText('ECG')).toBeInTheDocument()
    expect(screen.getByText('Oxygen Therapy')).toBeInTheDocument()
    expect(screen.getByText('Nebulization')).toBeInTheDocument()
    expect(screen.getByText('Laboratory')).toBeInTheDocument()
    expect(screen.getByText('Pharmacy')).toBeInTheDocument()
  })

  it('renders service descriptions', () => {
    renderServices()
    expect(screen.getByText(/Outpatient consultations/)).toBeInTheDocument()
    expect(screen.getByText(/Electrocardiogram/)).toBeInTheDocument()
  })

  it('renders why choose us section', () => {
    renderServices()
    expect(screen.getByText('Healthcare Excellence')).toBeInTheDocument()
    expect(screen.getByText('Expert Doctors')).toBeInTheDocument()
    expect(screen.getByText('Modern Facilities')).toBeInTheDocument()
    expect(screen.getByText('24/7 Emergency')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    renderServices()
    expect(screen.getByText('Need a Specific Service?')).toBeInTheDocument()
  })

  it('has phone and WhatsApp CTA links', () => {
    renderServices()
    const phoneLinks = screen.getAllByText(/Call:/)
    expect(phoneLinks.length).toBeGreaterThan(0)
    expect(screen.getByText('Message WhatsApp')).toBeInTheDocument()
  })
})

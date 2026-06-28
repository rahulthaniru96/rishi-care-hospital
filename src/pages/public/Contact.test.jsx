import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Contact from './Contact'

const renderContact = () =>
  render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  )

describe('Contact page', () => {
  it('renders page heading', () => {
    renderContact()
    expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
  })

  it('renders quick contact buttons', () => {
    renderContact()
    expect(screen.getByText('Call Now')).toBeInTheDocument()
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
    expect(screen.getByText('SMS')).toBeInTheDocument()
    expect(screen.getByText('Directions')).toBeInTheDocument()
  })

  it('renders hospital information', () => {
    renderContact()
    expect(screen.getByText('Hospital Information')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows hospital address', () => {
    renderContact()
    expect(screen.getByText(/Peerzadiguda/)).toBeInTheDocument()
  })

  it('shows working hours', () => {
    renderContact()
    expect(screen.getByText('Working Hours')).toBeInTheDocument()
    expect(screen.getByText('Monday – Saturday')).toBeInTheDocument()
    expect(screen.getByText('Sunday')).toBeInTheDocument()
    expect(screen.getByText('Emergency')).toBeInTheDocument()
  })

  it('renders location section with map', () => {
    renderContact()
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByTitle('Hospital Location')).toBeInTheDocument()
  })

  it('renders emergency banner', () => {
    renderContact()
    expect(screen.getByText('Medical Emergency?')).toBeInTheDocument()
  })

  it('phone links use tel: protocol', () => {
    renderContact()
    const phoneLinks = screen.getAllByText('+91 9391156294')
    const link = phoneLinks.find(el => el.closest('a'))?.closest('a')
    expect(link).toHaveAttribute('href', expect.stringContaining('tel:'))
  })
})

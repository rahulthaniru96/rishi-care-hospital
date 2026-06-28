import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from './Footer'

const renderFooter = () =>
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  )

describe('Footer component', () => {
  it('renders hospital branding', () => {
    renderFooter()
    expect(screen.getByText('Rishi Care')).toBeInTheDocument()
  })

  it('renders service links', () => {
    renderFooter()
    expect(screen.getByText('Medical Services')).toBeInTheDocument()
    expect(screen.getByText('Our Doctors')).toBeInTheDocument()
    expect(screen.getByText('Lab Tests')).toBeInTheDocument()
  })

  it('renders quick links', () => {
    renderFooter()
    expect(screen.getByText('Health Tips')).toBeInTheDocument()
    expect(screen.getByText('Reviews')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByText('Admin Panel')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    renderFooter()
    expect(screen.getByText('Address')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('displays current year in copyright', () => {
    renderFooter()
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument()
  })

  it('has call and WhatsApp action buttons', () => {
    renderFooter()
    expect(screen.getByText(/Call/)).toBeInTheDocument()
    expect(screen.getByText(/WhatsApp/)).toBeInTheDocument()
  })

  it('has social media links with aria-labels', () => {
    renderFooter()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
  })

  it('phone link uses tel: protocol', () => {
    renderFooter()
    const phoneLink = screen.getByText('+91 9391156294')
    expect(phoneLink.closest('a')).toHaveAttribute('href', expect.stringContaining('tel:'))
  })
})

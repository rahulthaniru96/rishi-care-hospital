import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

const renderHome = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )

describe('Home page', () => {
  it('renders the hero heading', () => {
    renderHome()
    expect(screen.getByText(/Your Health/)).toBeInTheDocument()
  })

  it('renders hero subtitle', () => {
    renderHome()
    expect(screen.getByText(/World-class medical care/)).toBeInTheDocument()
  })

  it('renders Call Now and WhatsApp CTA buttons', () => {
    renderHome()
    expect(screen.getAllByText('Call Now').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('WhatsApp').length).toBeGreaterThanOrEqual(1)
  })

  it('renders statistics section', () => {
    renderHome()
    expect(screen.getAllByText('Specialists').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Services').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('24/7').length).toBeGreaterThanOrEqual(1)
  })

  it('renders doctors section with doctor names', () => {
    renderHome()
    expect(screen.getByText('Meet Our Specialists')).toBeInTheDocument()
    expect(screen.getByText('Dr. R. Venkatasubbaiah Yadav')).toBeInTheDocument()
    expect(screen.getByText('Dr. B. Gouthami')).toBeInTheDocument()
  })

  it('renders services section', () => {
    renderHome()
    expect(screen.getByText('Our Medical Services')).toBeInTheDocument()
    expect(screen.getByText('OP Services')).toBeInTheDocument()
  })

  it('renders conditions section', () => {
    renderHome()
    expect(screen.getByText('Expertise Across Specialties')).toBeInTheDocument()
  })

  it('renders health tips section', () => {
    renderHome()
    expect(screen.getByText(/Health Tips & Advice/)).toBeInTheDocument()
  })

  it('renders testimonials section', () => {
    renderHome()
    expect(screen.getByText('Trusted by Our Community')).toBeInTheDocument()
    expect(screen.getByText('Rajesh Kumar')).toBeInTheDocument()
  })

  it('renders final CTA section', () => {
    renderHome()
    expect(screen.getByText('Ready to Experience Premium Care?')).toBeInTheDocument()
  })

  it('renders "View All" links', () => {
    renderHome()
    expect(screen.getByText(/View All Services/)).toBeInTheDocument()
    expect(screen.getByText(/View All Reviews/)).toBeInTheDocument()
    expect(screen.getByText(/View all conditions/)).toBeInTheDocument()
  })

  it('hero CTA links have correct hrefs', () => {
    renderHome()
    const callLink = screen.getAllByText('Call Now')[0].closest('a')
    expect(callLink.getAttribute('href')).toMatch(/^tel:/)
    const waLink = screen.getAllByText('WhatsApp')[0].closest('a')
    expect(waLink.getAttribute('href')).toMatch(/wa\.me/)
  })
})

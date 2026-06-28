import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Reviews from './Reviews'

const renderReviews = () =>
  render(
    <BrowserRouter>
      <Reviews />
    </BrowserRouter>
  )

describe('Reviews page', () => {
  it('renders page heading', () => {
    renderReviews()
    expect(screen.getByRole('heading', { name: 'Trusted by Our Community' })).toBeInTheDocument()
  })

  it('renders rating score', () => {
    renderReviews()
    expect(screen.getByText('4.9 / 5.0')).toBeInTheDocument()
  })

  it('renders testimonial authors', () => {
    renderReviews()
    expect(screen.getByText('Rajesh Kumar')).toBeInTheDocument()
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument()
    expect(screen.getByText('Manish Bhat')).toBeInTheDocument()
  })

  it('renders testimonial text', () => {
    renderReviews()
    expect(screen.getByText(/Excellent care from the moment/)).toBeInTheDocument()
    expect(screen.getByText(/daughter was treated/)).toBeInTheDocument()
  })

  it('renders Google Reviews link', () => {
    renderReviews()
    expect(screen.getByText('View on Google')).toBeInTheDocument()
  })

  it('renders Write a Review CTA', () => {
    renderReviews()
    expect(screen.getByText('Share Your Experience')).toBeInTheDocument()
    expect(screen.getByText('Write a Review')).toBeInTheDocument()
  })

  it('Google review link opens externally', () => {
    renderReviews()
    const link = screen.getByText('Write a Review').closest('a')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })
})

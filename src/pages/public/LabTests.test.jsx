import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LabTests from './LabTests'

const renderLabTests = () =>
  render(
    <BrowserRouter>
      <LabTests />
    </BrowserRouter>
  )

describe('LabTests page', () => {
  it('renders page heading', () => {
    renderLabTests()
    expect(screen.getByRole('heading', { name: 'Lab Tests' })).toBeInTheDocument()
  })

  it('renders all lab tests', () => {
    renderLabTests()
    expect(screen.getByText('CBC (Complete Blood Count)')).toBeInTheDocument()
    expect(screen.getByText('HbA1c')).toBeInTheDocument()
    expect(screen.getByText('Lipid Profile')).toBeInTheDocument()
    expect(screen.getByText('Thyroid Profile (TSH, T3, T4)')).toBeInTheDocument()
  })

  it('shows test descriptions', () => {
    renderLabTests()
    expect(screen.getByText(/Measures red cells, white cells/)).toBeInTheDocument()
    expect(screen.getByText(/average blood sugar/)).toBeInTheDocument()
  })

  it('shows test numbering', () => {
    renderLabTests()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders contact lab CTA', () => {
    renderLabTests()
    expect(screen.getByText(/test availability and pricing/)).toBeInTheDocument()
    const contactLink = screen.getByText(/Contact Lab/).closest('a')
    expect(contactLink).toHaveAttribute('href', expect.stringContaining('tel:'))
  })
})

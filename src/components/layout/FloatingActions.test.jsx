import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FloatingActions from './FloatingActions'

describe('FloatingActions component', () => {
  it('renders all action buttons', () => {
    render(<FloatingActions />)
    expect(screen.getByText('Call')).toBeInTheDocument()
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
    expect(screen.getByText('Directions')).toBeInTheDocument()
  })

  it('Call button uses tel: protocol', () => {
    render(<FloatingActions />)
    const callLink = screen.getByText('Call').closest('a')
    expect(callLink.getAttribute('href')).toMatch(/^tel:/)
  })

  it('WhatsApp button uses wa.me URL', () => {
    render(<FloatingActions />)
    const waLink = screen.getByText('WhatsApp').closest('a')
    expect(waLink.getAttribute('href')).toMatch(/wa\.me/)
  })

  it('WhatsApp and Directions open in new tab', () => {
    render(<FloatingActions />)
    expect(screen.getByText('WhatsApp').closest('a')).toHaveAttribute('target', '_blank')
    expect(screen.getByText('Directions').closest('a')).toHaveAttribute('target', '_blank')
  })

  it('Call does not open in new tab', () => {
    render(<FloatingActions />)
    expect(screen.getByText('Call').closest('a')).not.toHaveAttribute('target')
  })

  it('is hidden on large screens (lg:hidden class)', () => {
    const { container } = render(<FloatingActions />)
    expect(container.firstChild.className).toContain('lg:hidden')
  })

  it('has fixed positioning', () => {
    const { container } = render(<FloatingActions />)
    expect(container.firstChild.className).toContain('fixed')
  })
})

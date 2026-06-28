import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge component', () => {
  it('renders children text', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('applies info variant by default', () => {
    render(<Badge>Info</Badge>)
    expect(screen.getByText('Info').className).toContain('bg-healthcare-100')
  })

  it('applies success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success').className).toContain('text-success')
  })

  it('applies danger variant', () => {
    render(<Badge variant="danger">Danger</Badge>)
    expect(screen.getByText('Danger').className).toContain('text-emergency')
  })

  it('applies warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>)
    expect(screen.getByText('Warning').className).toContain('text-warning')
  })

  it('appends custom className', () => {
    render(<Badge className="ml-2">Custom</Badge>)
    expect(screen.getByText('Custom').className).toContain('ml-2')
  })

  it('renders as inline-flex span', () => {
    render(<Badge>Test</Badge>)
    const el = screen.getByText('Test')
    expect(el.tagName).toBe('SPAN')
    expect(el.className).toContain('inline-flex')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button component', () => {
  it('renders children text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
  })

  it('defaults to type="button"', () => {
    render(<Button>Test</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('accepts type="submit"', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies disabled attribute', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-healthcare-900')
  })

  it('applies danger variant classes', () => {
    render(<Button variant="danger">Delete</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-emergency')
  })

  it('applies success variant classes', () => {
    render(<Button variant="success">Confirm</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-success')
  })

  it('applies size classes', () => {
    render(<Button size="lg">Large</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('px-6')
    expect(btn.className).toContain('py-3')
  })

  it('appends custom className', () => {
    render(<Button className="mt-4">Custom</Button>)
    expect(screen.getByRole('button').className).toContain('mt-4')
  })
})

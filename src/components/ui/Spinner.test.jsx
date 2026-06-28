import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Spinner from './Spinner'

describe('Spinner component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('applies md size by default', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner.className).toContain('w-8')
    expect(spinner.className).toContain('h-8')
  })

  it('applies sm size', () => {
    const { container } = render(<Spinner size="sm" />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner.className).toContain('w-4')
    expect(spinner.className).toContain('h-4')
  })

  it('applies lg size', () => {
    const { container } = render(<Spinner size="lg" />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner.className).toContain('w-12')
    expect(spinner.className).toContain('h-12')
  })

  it('appends custom className to wrapper', () => {
    const { container } = render(<Spinner className="mt-8" />)
    const wrapper = container.firstChild
    expect(wrapper.className).toContain('mt-8')
  })
})

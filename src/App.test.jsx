import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App routing', () => {
  it('renders home page at /', () => {
    render(<App />)
    expect(screen.getByText(/Your Health/)).toBeInTheDocument()
  })

  it('renders navbar and footer on public pages', () => {
    render(<App />)
    expect(screen.getAllByText('Rishi Care').length).toBeGreaterThanOrEqual(1)
  })

  it('redirects unknown routes to home', () => {
    window.history.pushState({}, '', '/some-random-page')
    render(<App />)
    expect(screen.getByText(/Your Health/)).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

const renderNavbar = () =>
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )

describe('Navbar component', () => {
  it('renders hospital brand name', () => {
    renderNavbar()
    expect(screen.getByText('Rishi Care')).toBeInTheDocument()
    expect(screen.getByText('Hospital')).toBeInTheDocument()
  })

  it('renders the logo "R"', () => {
    renderNavbar()
    expect(screen.getByText('R')).toBeInTheDocument()
  })

  it('renders all navigation links in desktop nav', () => {
    renderNavbar()
    const expectedLinks = ['Home', 'Doctors', 'Services', 'Conditions', 'Lab Tests', 'Health Tips', 'Reviews', 'Contact']
    expectedLinks.forEach(label => {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('has a mobile menu toggle button', () => {
    renderNavbar()
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })

  it('toggles mobile menu on button click', () => {
    renderNavbar()
    const toggleBtn = screen.getByLabelText('Toggle menu')

    expect(screen.queryByText('Admin Login')).not.toBeInTheDocument()

    fireEvent.click(toggleBtn)
    expect(screen.getByText('Admin Login')).toBeInTheDocument()

    fireEvent.click(toggleBtn)
    expect(screen.queryByText('Admin Login')).not.toBeInTheDocument()
  })

  it('has sticky positioning', () => {
    renderNavbar()
    const header = document.querySelector('header')
    expect(header.className).toContain('sticky')
    expect(header.className).toContain('top-0')
  })

  it('logo links to home page', () => {
    renderNavbar()
    const logoLink = screen.getByText('Rishi Care').closest('a')
    expect(logoLink).toHaveAttribute('href', '/')
  })
})

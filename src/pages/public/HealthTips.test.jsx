import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HealthTips from './HealthTips'

const renderHealthTips = () =>
  render(
    <BrowserRouter>
      <HealthTips />
    </BrowserRouter>
  )

describe('HealthTips page', () => {
  it('renders page heading', () => {
    renderHealthTips()
    expect(screen.getByRole('heading', { name: 'Health Tips' })).toBeInTheDocument()
  })

  it('renders all health tip cards', () => {
    renderHealthTips()
    expect(screen.getByText('How to Prevent Kidney Stones')).toBeInTheDocument()
    expect(screen.getByText('Diabetes Awareness')).toBeInTheDocument()
    expect(screen.getByText('Blood Pressure Management')).toBeInTheDocument()
    expect(screen.getByText('Dengue Prevention')).toBeInTheDocument()
  })

  it('shows summaries', () => {
    renderHealthTips()
    expect(screen.getByText(/Simple daily habits/)).toBeInTheDocument()
  })

  it('each tip links to its detail page', () => {
    renderHealthTips()
    const link = screen.getByText('How to Prevent Kidney Stones').closest('a')
    expect(link).toHaveAttribute('href', '/health-tips/prevent-kidney-stones')
  })

  it('shows category badges', () => {
    renderHealthTips()
    expect(screen.getByText('Kidney Health')).toBeInTheDocument()
    expect(screen.getByText('Diabetes')).toBeInTheDocument()
    expect(screen.getByText('Heart Care')).toBeInTheDocument()
    expect(screen.getByText('Prevention')).toBeInTheDocument()
  })

  it('shows read time indicator', () => {
    renderHealthTips()
    const readTimes = screen.getAllByText('2 min read')
    expect(readTimes.length).toBe(4)
  })
})

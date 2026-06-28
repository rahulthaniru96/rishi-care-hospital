import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Doctors from './Doctors'

const renderDoctors = () =>
  render(
    <BrowserRouter>
      <Doctors />
    </BrowserRouter>
  )

describe('Doctors page', () => {
  it('renders page heading', () => {
    renderDoctors()
    expect(screen.getByText('Meet Our Specialists')).toBeInTheDocument()
  })

  it('renders all doctors', () => {
    renderDoctors()
    expect(screen.getByText('Dr. R. Venkatasubbaiah Yadav')).toBeInTheDocument()
    expect(screen.getByText('Dr. B. Gouthami')).toBeInTheDocument()
  })

  it('shows doctor qualifications', () => {
    renderDoctors()
    expect(screen.getByText('MBBS, DNB (General Medicine)')).toBeInTheDocument()
    expect(screen.getByText('MBBS')).toBeInTheDocument()
  })

  it('shows doctor specializations', () => {
    renderDoctors()
    expect(screen.getByText('General Physician & Diabetologist')).toBeInTheDocument()
    expect(screen.getByText('Family Physician')).toBeInTheDocument()
  })

  it('shows availability info', () => {
    renderDoctors()
    const availability = screen.getAllByText('Mon – Sat: 9am – 9pm')
    expect(availability.length).toBe(2)
  })

  it('renders call and chat buttons for each doctor', () => {
    renderDoctors()
    const callButtons = screen.getAllByText('Call')
    const chatButtons = screen.getAllByText(/Chat/)
    expect(callButtons.length).toBe(2)
    expect(chatButtons.length).toBe(2)
  })

  it('renders CTA section', () => {
    renderDoctors()
    expect(screen.getByText('Ready to Schedule Your Consultation?')).toBeInTheDocument()
  })

  it('renders doctor images with alt text', () => {
    renderDoctors()
    expect(screen.getByAltText('Dr. R. Venkatasubbaiah Yadav')).toBeInTheDocument()
    expect(screen.getByAltText('Dr. B. Gouthami')).toBeInTheDocument()
  })
})

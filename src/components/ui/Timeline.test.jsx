import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Timeline from './Timeline'

const mockRecords = [
  {
    id: 1,
    record_type: 'Consultation',
    record_date: '2026-06-15',
    summary: 'General checkup completed',
    doctor_name: 'Dr. Yadav',
    remarks: 'Follow up in 2 weeks',
  },
  {
    id: 2,
    record_type: 'Blood Test',
    record_date: '2026-06-10',
    summary: 'CBC and lipid profile',
    doctor_name: null,
    remarks: null,
  },
]

describe('Timeline component', () => {
  it('shows empty state when no records', () => {
    render(<Timeline records={[]} />)
    expect(screen.getByText('No history records yet.')).toBeInTheDocument()
  })

  it('shows empty state when records is null', () => {
    render(<Timeline records={null} />)
    expect(screen.getByText('No history records yet.')).toBeInTheDocument()
  })

  it('renders record summaries', () => {
    render(<Timeline records={mockRecords} />)
    expect(screen.getByText('General checkup completed')).toBeInTheDocument()
    expect(screen.getByText('CBC and lipid profile')).toBeInTheDocument()
  })

  it('displays record type badges', () => {
    render(<Timeline records={mockRecords} />)
    expect(screen.getByText('Consultation')).toBeInTheDocument()
    expect(screen.getByText('Blood Test')).toBeInTheDocument()
  })

  it('displays doctor name when present', () => {
    render(<Timeline records={mockRecords} />)
    expect(screen.getByText(/Dr\. Yadav/)).toBeInTheDocument()
  })

  it('displays remarks when present', () => {
    render(<Timeline records={mockRecords} />)
    expect(screen.getByText('Follow up in 2 weeks')).toBeInTheDocument()
  })

  it('formats dates in en-IN locale', () => {
    render(<Timeline records={mockRecords} />)
    expect(screen.getByText(/15 Jun 2026/)).toBeInTheDocument()
  })
})

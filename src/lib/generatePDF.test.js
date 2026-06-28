import { describe, it, expect, vi } from 'vitest'
import { generateBillPDF } from './generatePDF'

vi.mock('jspdf', () => {
  const createMockDoc = () => ({
    setFillColor: vi.fn(),
    setTextColor: vi.fn(),
    setDrawColor: vi.fn(),
    setLineWidth: vi.fn(),
    setFontSize: vi.fn(),
    setFont: vi.fn(),
    rect: vi.fn(),
    text: vi.fn(),
    circle: vi.fn(),
    line: vi.fn(),
    save: vi.fn(),
  })
  const MockJsPDF = vi.fn(function () {
    Object.assign(this, createMockDoc())
  })
  return { default: MockJsPDF }
})

const mockBill = {
  bill_number: 'RCH-20260628-0001',
  created_at: '2026-06-28T10:00:00.000Z',
  subtotal: 500,
  gst_amount: 25,
  grand_total: 525,
}

const mockPatient = {
  name: 'John Doe',
  age: 35,
  gender: 'Male',
  phone: '+919900112233',
  doctor_name: 'Dr. Yadav',
}

const mockItems = [
  {
    medicine_name: 'Paracetamol 500mg',
    quantity: 10,
    unit_price: 5,
    gst_percent: 5,
    line_total: 52.5,
  },
  {
    medicine_name: 'Amoxicillin 250mg',
    quantity: 6,
    unit_price: 75,
    gst_percent: 5,
    line_total: 472.5,
  },
]

describe('generateBillPDF', () => {
  it('creates PDF without throwing', () => {
    expect(() => generateBillPDF(mockBill, mockPatient, mockItems)).not.toThrow()
  })

  it('calls jsPDF save with correct filename', async () => {
    const jsPDF = (await import('jspdf')).default
    generateBillPDF(mockBill, mockPatient, mockItems)
    const mockDoc = jsPDF.mock.results[jsPDF.mock.results.length - 1].value
    expect(mockDoc.save).toHaveBeenCalledWith(expect.stringContaining('Bill_RCH-20260628-0001_John_Doe.pdf'))
  })

  it('renders header text', async () => {
    const jsPDF = (await import('jspdf')).default
    generateBillPDF(mockBill, mockPatient, mockItems)
    const mockDoc = jsPDF.mock.results[jsPDF.mock.results.length - 1].value
    const textCalls = mockDoc.text.mock.calls.map(c => c[0])
    expect(textCalls).toContain('RISHI CARE HOSPITAL')
    expect(textCalls).toContain('MEDICAL BILL / RECEIPT')
  })

  it('renders patient name', async () => {
    const jsPDF = (await import('jspdf')).default
    generateBillPDF(mockBill, mockPatient, mockItems)
    const mockDoc = jsPDF.mock.results[jsPDF.mock.results.length - 1].value
    const textCalls = mockDoc.text.mock.calls.map(c => c[0])
    expect(textCalls.some(t => t.includes('John Doe'))).toBe(true)
  })

  it('renders medicine names', async () => {
    const jsPDF = (await import('jspdf')).default
    generateBillPDF(mockBill, mockPatient, mockItems)
    const mockDoc = jsPDF.mock.results[jsPDF.mock.results.length - 1].value
    const textCalls = mockDoc.text.mock.calls.map(c => c[0])
    expect(textCalls.some(t => t.includes('Paracetamol'))).toBe(true)
    expect(textCalls.some(t => t.includes('Amoxicillin'))).toBe(true)
  })
})

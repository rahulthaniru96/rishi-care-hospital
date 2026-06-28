import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from './SearchInput'

describe('SearchInput component', () => {
  it('renders with default placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Find doctors..." />)
    expect(screen.getByPlaceholderText('Find doctors...')).toBeInTheDocument()
  })

  it('displays the current value', () => {
    render(<SearchInput value="diabetes" onChange={() => {}} />)
    expect(screen.getByDisplayValue('diabetes')).toBeInTheDocument()
  })

  it('calls onChange with new value when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)
    const input = screen.getByRole('searchbox')
    await user.type(input, 'test')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith('t')
  })

  it('has aria-label matching placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Search conditions" />)
    expect(screen.getByLabelText('Search conditions')).toBeInTheDocument()
  })

  it('has autocomplete off', () => {
    render(<SearchInput value="" onChange={() => {}} />)
    expect(screen.getByRole('searchbox')).toHaveAttribute('autocomplete', 'off')
  })
})

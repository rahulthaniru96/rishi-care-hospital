import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StatCard from './StatCard'

describe('StatCard component', () => {
  it('renders title and value', () => {
    render(<StatCard title="Patients" value="42" icon="👤" />)
    expect(screen.getByText('Patients')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders icon', () => {
    render(<StatCard title="Patients" value="42" icon="👤" />)
    expect(screen.getByText('👤')).toBeInTheDocument()
  })

  it('is clickable when onClick is provided', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<StatCard title="Patients" value="42" icon="👤" onClick={onClick} />)
    await user.click(screen.getByText('42').closest('div[class*="bg-white"]'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('has cursor-pointer class when clickable', () => {
    const { container } = render(<StatCard title="Patients" value="42" icon="👤" onClick={() => {}} />)
    expect(container.firstChild.className).toContain('cursor-pointer')
  })

  it('does not have cursor-pointer when not clickable', () => {
    const { container } = render(<StatCard title="Patients" value="42" icon="👤" />)
    expect(container.firstChild.className).not.toContain('cursor-pointer')
  })
})

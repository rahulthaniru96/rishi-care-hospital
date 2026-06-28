import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './Modal'

describe('Modal component', () => {
  it('renders nothing when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={() => {}} title="Test">Content</Modal>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Test Modal">Modal Content</Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('displays the title', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="My Title">Body</Modal>)
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose} title="Test">Content</Modal>)
    fireEvent.click(screen.getByLabelText('Close modal'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose} title="Test">Content</Modal>)
    const backdrop = document.querySelector('.bg-black\\/40')
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose} title="Test">Content</Modal>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('has proper aria attributes', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Accessible">Content</Modal>)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
  })

  it('prevents body scroll when open', () => {
    const { unmount } = render(<Modal isOpen={true} onClose={() => {}} title="Test">Content</Modal>)
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { supabase } from '../../lib/supabase'

describe('ProtectedRoute component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows spinner while loading session', () => {
    supabase.auth.getSession.mockReturnValue(new Promise(() => {}))
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <Routes>
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><div>Dashboard</div></ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    )
    expect(document.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('redirects to login when no session', async () => {
    supabase.auth.getSession.mockResolvedValue({ data: { session: null } })
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <Routes>
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><div>Dashboard</div></ProtectedRoute>
          } />
          <Route path="/admin/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument()
    })
  })

  it('renders children when session exists', async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: { user: { id: '123' } } }
    })
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <Routes>
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><div>Dashboard Content</div></ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
    })
  })
})

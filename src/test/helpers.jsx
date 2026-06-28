import { render } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

export function renderWithRouter(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}

export function renderWithBrowserRouter(ui) {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  )
}

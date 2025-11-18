import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext'
import { authService } from '@/services/authService'
import { UserRole } from '@/types'

vi.mock('@/services/authService')

const TestComponent = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="user">{user?.name || 'no user'}</div>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should provide initial state', async () => {
    vi.mocked(authService.initializeAuth).mockImplementation(() => {})
    vi.mocked(authService.getCurrentUser).mockResolvedValue({ data: null })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    expect(screen.getByTestId('user')).toHaveTextContent('no user')
  })

  it('should handle successful login', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.APPLICANT
    }

    vi.mocked(authService.initializeAuth).mockImplementation(() => {})
    vi.mocked(authService.getCurrentUser).mockResolvedValue({ data: null })
    vi.mocked(authService.login).mockResolvedValue({ 
      data: { user: mockUser, session: null } 
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })

    screen.getByText('Login').click()

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User')
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    })
  })

  it('should handle logout', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.APPLICANT
    }

    vi.mocked(authService.initializeAuth).mockImplementation(() => {})
    vi.mocked(authService.getCurrentUser).mockResolvedValue({ data: mockUser })
    vi.mocked(authService.logout).mockResolvedValue()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User')
    })

    screen.getByText('Logout').click()

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user')
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    })
  })

  it('should throw error when useAuth is used outside provider', () => {
    const TestComponentOutside = () => {
      useAuth()
      return <div>Test</div>
    }

    expect(() => render(<TestComponentOutside />)).toThrow(
      'useAuth must be used within AuthProvider'
    )
  })
})
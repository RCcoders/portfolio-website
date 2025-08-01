import LoadingSpinner from './LoadingSpinner'

// For buttons with loading states
export function LoadingButton({ 
  isLoading, 
  children, 
  onClick,
  className = '',
  disabled = false 
}: {
  isLoading: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`flex items-center justify-center gap-2 ${className} ${
        isLoading ? 'opacity-75 cursor-not-allowed' : ''
      }`}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  )
}

// For page loading states
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center">
        <LoadingSpinner size="lg" className="text-blue-400 mb-4" />
        <p className="text-gray-300">Loading...</p>
      </div>
    </div>
  )
}

// For content sections
export function ContentLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
  )
}
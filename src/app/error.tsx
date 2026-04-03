'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-6xl text-gold mb-4">OOPS</h1>
        <p className="text-cream/80 text-lg mb-2 font-body">Something went wrong.</p>
        <p className="text-cream/40 text-sm mb-8 font-body">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gold text-navy font-bold rounded hover:bg-gold/90 transition-colors font-accent uppercase tracking-wider"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

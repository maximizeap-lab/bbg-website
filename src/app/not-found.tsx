import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-8xl text-gold mb-4">404</h1>
        <p className="text-cream/80 text-lg mb-8 font-body">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gold text-navy font-bold rounded hover:bg-gold/90 transition-colors font-accent uppercase tracking-wider"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

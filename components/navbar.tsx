import Link from 'next/link'
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  return (
    <nav
      style={{
        borderBottom: '1px solid var(--border)',
        paddingTop: '1.25rem',
        paddingBottom: '1.25rem',
      }}
    >
      <div
        style={{
          width: '66.666%',
          maxWidth: '720px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
              className='border-b pb-4'
      >
        <Link
          href="/"
          style={{
            color: 'var(--fg)',
            textDecoration: 'none',
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            fontWeight: '700',
            letterSpacing: '-0.02em',
          }}
        >
          shreyas&apos; blogs
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}


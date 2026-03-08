'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAV_ITEMS } from '@/constants/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="mb-6">
      <nav>
        <ul className="flex items-center justify-center gap-4 lg:gap-6">
          <Link
            href="/"
            className={`${pathname === '/' ? 'nav-link-active' : ''} nav-link`}
          >
            Home
          </Link>

          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${pathname.startsWith(item.href) ? 'nav-link-active' : ''} nav-link`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

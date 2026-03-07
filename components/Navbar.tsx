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
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${pathname === item.href ? 'border-border text-primary font-medium' : 'hover:text-primary border-transparent'} block border-b-2 px-3 py-2 whitespace-nowrap transition-colors duration-200 ease-in-out`}
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

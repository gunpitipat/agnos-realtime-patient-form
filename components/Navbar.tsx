'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAV_ITEMS } from '@/constants/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header>
      <nav>
        <ul className="flex items-center justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${pathname === item.href ? 'border-border text-primary font-medium' : 'hover:text-primary border-transparent'} block border-b-2 px-4 py-2 transition-colors duration-200 ease-in-out`}
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

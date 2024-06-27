'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LocaleSwitcher() {
  return (
    <ul className="flex gap-x-3">
      <li>
        <Link
          href={`/?lang=fr`}
          as="/fr"
          className="rounded-md border  px-3 py-2 "
        >
          <h2>fr</h2>
        </Link>
      </li>

      <li>
        <Link
          href={`/?lang=en`}
          as="/en"
          className="rounded-md border  px-3 py-2 "
        >
          <h2>en</h2>
        </Link>
      </li>
    </ul>
  );
}

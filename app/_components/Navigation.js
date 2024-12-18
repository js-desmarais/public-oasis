import Link from 'next/link';

import { auth } from '@/app/_lib/auth';
import Guest from '@/app/_components/Guest';

export default async function Navigation() {
	const session = await auth();

	return (
		<nav className='z-10 text-xl'>
			<ul className='flex gap-16 items-center'>
				<li>
					<Link href='/cabins' className='hover:text-accent-400 transition-colors'>
						Cabins
					</Link>
				</li>
				<li>
					<Link href='/about' className='hover:text-accent-400 transition-colors'>
						About
					</Link>
				</li>
				<Guest />
			</ul>
		</nav>
	);
}

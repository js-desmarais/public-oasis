import Image from 'next/image';
import Link from 'next/link';

import { auth } from '../_lib/auth';

export default async function Navigation() {
	const session = await auth();
	console.log(session);

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
				<li>
					<Link
						href='/account'
						className='hover:text-accent-400 transition-colors flex gap-4 items-center'
					>
						{session?.user?.image ? (
							<div className='relative h-8 w-8'>
								<Image
									fill
									className='rounded-full'
									src={session.user.image}
									alt={session.user.name}
									referrerPolicy='no-referrer'
								/>
							</div>
						) : (
							''
						)}
						<span>Guest area</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

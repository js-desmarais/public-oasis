'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@/app/_components/AuthContext';

export default function Guest() {
	const session = useAuth();

	return (
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
	);
}

'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteBooking } from '@/app/_lib/actions';

export default function ReservationList({ bookings }) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(curBookings, bookingId) => {
			return curBookings.filter(booking => booking.id !== bookingId);
		}
	);

	async function handleDelete(bookingId) {
		optimisticDelete(bookingId); // NOTE invokes the optimistic function to update the UI
		await deleteBooking(bookingId); // NOTE actually deletes the booking from the database
	}

	return (
		<ul className='space-y-6'>
			{optimisticBookings.map(booking => (
				<ReservationCard booking={booking} onDelete={handleDelete} key={booking.id} />
			))}
		</ul>
	);
}

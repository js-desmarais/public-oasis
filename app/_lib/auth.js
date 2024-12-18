import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized({ auth, req }) {
			return !!auth?.user;
		},
		async signIn({ user, account, profile }) {
			try {
				const existingGuest = await getGuest(user.email);

				if (!existingGuest) await createGuest({ email: user.email, fullName: user.name }); // NOTE Very important to await, otherwise moving on to the session callback with a guest that hasn't been created yet.

				return true;
			} catch {
				return false;
			}
		},
		async session({ session, user }) {
			const guest = await getGuest(session.user.email);
			session.user.guestId = guest.id;

			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth(authConfig);

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '../../../../utils/database';
import User from '../../../../models/user';

console.log(
  {
    clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }
);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    // Session callback to add the user ID to the session object
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      // Add user ID to the session if the user exists
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },

    // SignIn callback to manage user registration
    async signIn({ profile }) {
      try {
        await connectToDB();

        console.log("Connected.............");

        // Check if a user already exists in the database
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If user does not exist, create a new user
        if (!userExists) {
          console.log("Creating new user...");
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(), // remove spaces for the username
            image: profile.picture,
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.log("Error during sign-in:", error);
        return false; // Deny sign-in
      }
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET, // Add secret for NextAuth JWT signing
});

// Export the handler for Next.js API routes
export { handler as GET, handler as POST };

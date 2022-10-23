import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '../../../prisma/prisma'

export const authOptions = {
  callbacks: {
    async session({ session }) {
      if (!session?.user?.email) return { expires: new Date().toDateString() }
      const idUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })
      if (!idUser) return { expires: new Date().toDateString() }
      session.user.id = idUser.id
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
}
export default NextAuth(authOptions)

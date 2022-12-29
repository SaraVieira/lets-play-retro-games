import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { Game } from '../../constants/types'
import { formatDate } from '../../utils/dates'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { prisma } from '../../prisma/prisma'
import { consolesMenu } from '../../constants/info'

const FranchiseAll = ({ franchises }: { franchises: Game[] }) => {
  return (
    <div className="max-w-[90%] !block mt-6 mb-6 text-left m-auto">
      <div className=" w-[1024px] tui-window">
        <fieldset className="tui-fieldset">
          <legend>All Franchises</legend>
          <ul className="grid sm:grid-cols-2">
            {franchises.map((franchise) => (
              <li key={franchise.id}>
                <Link href={`/franchises/${franchise.slug}`}>
                  {franchise.name}
                </Link>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const result = await prisma.collection.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
  })

  return {
    props: {
      franchises: result,
    },
  }
}

export default FranchiseAll

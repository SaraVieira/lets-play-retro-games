import { Provider } from 'next-auth/providers'
import { getProviders, signIn } from 'next-auth/react'

const SignIn = ({ providers }: { providers: Provider[] }) => {
  return (
    <section className="flex items-center h-full w-full justify-center">
      <div className="tui-window">
        <fieldset className="tui-fieldset tui-border-double gap-4 block !p-6">
          <legend>Choose your path</legend>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              className="tui-button"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          ))}
        </fieldset>
      </div>
    </section>
  )
}

export default SignIn

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

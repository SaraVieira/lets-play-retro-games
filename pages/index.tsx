import Link from 'next/link'

export default function Example() {
  return (
    <div className="bg-slate-900">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <Link href={'/nes/random'}>
            <img
              src="/nes.png"
              className="w-[320px] transition hover:translate-y-[-20px]"
            />
          </Link>{' '}
        </div>
      </div>
    </div>
  )
}
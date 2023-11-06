import Image from 'next/image'

export default function Home() {
  return (
    <section className='w-full max-w-screen-lg font-sans text-base mx-auto sm:pr-3 sm:pl-7 min-[100px]:p-3 bg-slate-100 border border-gray-700 rounded-lg min-w-[300px]   overflow-y-scroll h-[88vh]'>
      <Image
      src="/main-image.png"
      width={2339}
      height={3308}
      alt="Picture of the author"
      />
		</section>
  )
}
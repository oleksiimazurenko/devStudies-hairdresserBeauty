import NavBarWrapper from '@/components/NavBarWrapper/NavBarWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function Header() {

	return (
		<header className='max-w-screen-lg self-end grid mb-5'>

			{/* <nav className='min-w-[400px] bg-slate-100 rounded-12 mb-8 flex items-center justify-center space-x-4 shadow-md dark:shadow-lg px-2 py-1 rounded-lg'>
				<Link href="/" className='w-full'><Button className='w-full' activePathname={'/'}>Головна строніка</Button></Link>
				<Link href="/schedule" className='w-full'><Button className='m-1 w-full' activePathname={'/schedule'}>Розклад</Button></Link>
				<Link href="/history" className='w-full'><Button className='w-full' activePathname={'/history'}>Історія записів</Button></Link>
			</nav> */}
			<NavBarWrapper/>

		</header>
	);
}
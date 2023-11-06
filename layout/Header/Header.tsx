import NavBarWrapper from '@/components/NavBarWrapper/NavBarWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function Header() {

	return (
		<header className='max-w-screen-lg self-end grid mb-5'>
			<NavBarWrapper/>

		</header>
	);
}
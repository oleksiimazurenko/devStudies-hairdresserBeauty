import CalendarWrapper from '@/components/CalendarWrapper/CalendarWrapper'

import styles from './style.module.scss'
import { Suspense } from 'react'
import Loading from './loading'

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={styles.section}>
			<div className='flex flex-col'>
				<CalendarWrapper/>
			</div>
			<Suspense fallback={ <Loading/> }>
				{children}
			</Suspense>
		</section>
  )
}
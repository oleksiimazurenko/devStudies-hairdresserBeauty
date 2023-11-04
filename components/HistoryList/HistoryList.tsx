'use client'

import dayjs from 'dayjs'
import AppointmentItem from '../AppointmentItem/AppointmentItem'

import { useRangeDate } from '@/store/store'
import { TAppointment } from '@/types/types'
import styles from './HistoryList.module.scss'

export default function HistoryList({
	data,
}: {
	data: string | TAppointment[]
}) {
	
	const { rangeDate } = useRangeDate()

	if (typeof data === 'string') {
		return <div className='text-white text-center flex flex-col justify-center  text-xl p-10 rounded-md bg-gradient-to-t from-slate-400 to-slate-300'>{data}</div>
	} else if (Array.isArray(data)) {

		const sortedAppointments = data
			.map(item => ({
				...item,
				date: dayjs(item.date).format('YYYY-MM-DD HH:mm:ss'),
			}))
			.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))

		if (rangeDate?.from) {
			const rangeSorted = sortedAppointments
				.filter(appointment => {
					if (
						(rangeDate?.to &&
							dayjs(appointment.date).isAfter(dayjs(rangeDate.from)) &&
							dayjs(appointment.date).isBefore(dayjs(rangeDate.to))) ||
						dayjs(appointment.date).isSame(dayjs(rangeDate.to), 'day')
					) {
						return appointment
					} else {
						if (dayjs(appointment.date).isSame(rangeDate.from, 'day')) {
							return appointment
						}
					}
				})
				.map(appointment => (
					<AppointmentItem key={appointment.id} {...appointment} />
				))

			if (rangeSorted.length === 0) {
				return (
					<div className={styles.historyList}>
						<p className='text-white text-center col-span-3 text-xl p-10 rounded-md bg-gradient-to-t from-slate-400 to-slate-300'>За цим діапазоном немає записів</p>
					</div>
				)
			}

			if (rangeSorted.length !== 0) {
				return <div className={styles.historyList}>{rangeSorted}</div>
			}
		} else {
			return <div className={styles.historyList}>{sortedAppointments.map(appointment => (
				<AppointmentItem key={appointment.id} {...appointment} />
			))}</div>
		}
	}
}
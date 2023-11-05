'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export default function Timer({ date }: { date: string }) {
	const [timeHours, changeTimeHours] = useState<string | null>(null)
	const [timeMinutes, changeTimeMinutes] = useState<string | null>(null)

	function formatHours(count: number, type?: string): string {
		if (count % 100 > 10 && count % 100 < 20) {
			return type === 'HH' ? 'годин' : 'хвилин'
		}

		switch (count % 10) {
			case 1:
				return type === 'HH' ? 'година' : 'хвилина'
			case 2:
			case 3:
			case 4:
				return type === 'HH' ? 'години' : 'хвилини'
			default:
				return type === 'HH' ? 'годин' : 'хвилин'
		}
	}

	useEffect(() => {

		changeTimeHours(
			`${dayjs(date).diff(undefined, 'h')} ${formatHours(
				dayjs(date).diff(undefined, 'h'),
				'HH'
			)}`
		)
		changeTimeMinutes(
			`${dayjs(date).diff(undefined, 'm') % 60} 
			${formatHours(dayjs(date).diff(undefined, 'm'))}`
		)

		const intervalId = setInterval(() => {
			changeTimeHours(
				`${dayjs(date).diff(undefined, 'h')} ${formatHours(
					dayjs(date).diff(undefined, 'h'),
					'HH'
				)}`
			)
			changeTimeMinutes(
				`${dayjs(date).diff(undefined, 'm') % 60} 
				${formatHours(dayjs(date).diff(undefined, 'm'))}`
			)
		}, 60000)

		return () => {
			clearInterval(intervalId)
		}
	}, [date])

	return (
		<span className='flex flex-col justify-center items-center'>
			<span><i>Залишилось до приходу клієнта</i></span>
			<span className='!text-[13px]'><b>{timeHours} та {timeMinutes}</b></span>
		</span>
		
	)
}
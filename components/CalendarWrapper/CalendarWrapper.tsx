'use client'

import { DateRange, SelectRangeEventHandler } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from 'react'
import { useRangeDate } from '@/store/store'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

function CalendarWrapper() {

	const [date, setDate] = useState<DateRange | undefined>()
	const { setRangeDate } = useRangeDate()

	const pathName = usePathname();

	useEffect(() => {
		setRangeDate(date);
	},[date, setRangeDate])

	const resetRange = () => {
		setDate(undefined) 
	}
	const checkEmpty: SelectRangeEventHandler | undefined = (e) => {
		if(e === undefined) {
			setDate(undefined)
			setRangeDate({})
		}
		setDate(e)
	}

	useEffect(() => {
		resetRange();
	}, [pathName]);

	return (
		<>
			<Button className='text-[10px] h-5 mb-3' onClick={resetRange}>Зкинути діапазон</Button>
			<Calendar
			initialFocus
			mode="range"
			defaultMonth={date?.from}
			selected={date}
			onSelect={checkEmpty}
			className=' bg-white shadow-md rounded-sm mb-3'
			/>
		</>
	)
}

export default CalendarWrapper;
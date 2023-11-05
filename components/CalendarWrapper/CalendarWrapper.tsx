'use client'

import { DateRange, SelectRangeEventHandler } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from 'react'
import { useRangeDate } from '@/store/store'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

import cn from 'classnames';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import dayjs from 'dayjs'

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
			<Popover>
				<PopoverTrigger asChild className='mb-5'>
					<Button
						variant={"outline"}
						className={cn(
							"w-[240px] justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? `${dayjs(date.from).format('DD.MM.YYYY')} - ${date.to ? dayjs(date.to).format('DD.MM.YYYY') : 'Не обрано'} ` : <span>Обрати діапазон</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
					initialFocus
					mode="range"
					defaultMonth={date?.from}
					selected={date}
					onSelect={checkEmpty}
					className=' bg-white rounded-sm'
					/>
					<Button className='text-[10px] h-5 rounded-t-[0px] rounded-tr-[0px] rounded-br-[0px]' onClick={resetRange}>Зкинути діапазон</Button>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default CalendarWrapper;
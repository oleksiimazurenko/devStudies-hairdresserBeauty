'use client'

import { TAppointment } from '@/types/types'
import { Separator } from "@/components/ui/separator"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { Optional } from 'utility-types'

import dayjs from 'dayjs'
import Timer from '../Timer/Timer'
import CancelModal from '../CancelModal/CancelModal'
import cn from 'classnames';

type AppointmentProps = Optional<TAppointment, 'canceled'>

export default function AppointmentItem({
	date,
	name,
	service,
	phone,
	canceled,
	id,
}: AppointmentProps) {
	const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm')

	return (
		<Card className={cn('border-0 w-[210px] min-h-[310px] bg-gradient-to-t to-slate-300', 
			{
				['from-slate-400']: !canceled && dayjs(date).diff(undefined, 'minute') > 0 ,
				['from-red-400']: canceled,
				['from-green-400']: dayjs(date).diff(undefined, 'minute') < 0 && !canceled
			})}>
			<CardHeader className='p-2 rounded-t-[5px]'>
				<CardTitle className='text-sm text-center'>Картка запису</CardTitle>
			</CardHeader>
			<Separator/>
			<CardContent className='px-0 pb-0'>
				<p className='text-[13px] p-1 text-center leading-4'><i>Дата та час запису</i><br/><b>{formattedDate}</b></p>
				<Separator/>
				<p className='text-[13px] p-1 text-center leading-4'><i>Як звати клієнта</i><br/><b>{name}</b></p>
				<Separator/>
				<p className='text-[13px] p-1 text-center leading-4'><i>Вид послуги</i><br/><b>{service}</b></p>
				<Separator/>
				<p className='text-[13px] p-1 text-center leading-4'><i>Номер телефону клієнта</i><br/><b>{phone}</b></p>
				<Separator/>
				{
					!canceled 
						&& 
					dayjs(date).diff(undefined, 'minute') > 0 
						&& 
					<p className='text-[13px] p-1 text-center leading-4'>{!canceled && <Timer date={date} />}</p>
				}
			</CardContent>
			<Separator/>
			<CardFooter className='px-0 w-full pb-0 rounded-b-[5px] justify-center'>
				{
					!canceled 
						&& 
					dayjs(date).diff(undefined, 'minute') > 0 
						&& 
					<CancelModal id={id}/>
				}
				{
					canceled 
						&& 
					<div className='w-full py-[47px] text-center rounded-b-[5px]'>Запис скасований</div>
				}
				{
					dayjs(date).diff(undefined, 'minute') < 0 
						&&
					!canceled
						&&
					<div className='w-full py-[47px] text-center rounded-b-[5px]'>Запис виконаний</div>
				}
			</CardFooter>
		</Card>
	)
}
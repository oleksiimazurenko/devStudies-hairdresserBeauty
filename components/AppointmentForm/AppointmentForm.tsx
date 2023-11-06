'use client'

import onSubmit from '@/actions/onSubmit'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormInput } from 'lucide-react'

import cn from 'classnames';

import { Input } from '@/components/ui/input'

import { TAppointmentSchema, clientAppointmentSchema } from '@/types/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'


import { InputMask } from 'primereact/inputmask';
import { RefObject, useRef } from 'react'

export default function AppointmentForm() {

	let loadingStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle'

	const buttonRef: RefObject<HTMLButtonElement> = useRef(null);

	const form = useForm<TAppointmentSchema>({
		resolver: zodResolver(clientAppointmentSchema),
		defaultValues: {
			name: '',
			service: ''
		},
	})

	const onFormSubmit = (values: TAppointmentSchema) => {

		if (buttonRef.current) {
			buttonRef.current.disabled = true
			buttonRef.current.textContent = 'Додаємо новий запис...'
		}
		

		const currentDateTime = `${values.date}:00`;

		const [ day, month, year, time ] = currentDateTime.split(/\/| /)
		const [ hour, minutes, seconds ] = time.split(':');
		const formattedResult = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}Z`

		const changeDate = {
			...values,
			date: formattedResult
		}

		onSubmit(changeDate)
		.then(data => {
			if (buttonRef.current) buttonRef.current.textContent = 'Запис додано!'
			setTimeout(() => {
				if (buttonRef.current) {
					buttonRef.current.disabled = false
					buttonRef.current.textContent = 'Записати'
				}
			}, 2000)
			console.log(data)
		})
		.catch(() => {
			if (buttonRef.current) buttonRef.current.textContent = 'Помилка додавання запису';
			loadingStatus = 'error'
		})
		form.reset();
	}

	return (

		<AlertDialog>

			<AlertDialogTrigger className={cn('!text-muted-foreground justify-start hover:!text-black hover:bg-gray-100 text-sm w-[240px] bg-white rounded-md border border-gray-200 flex items-center px-4 py-2')}>
				<FormInput className="mr-2 h-4 w-4" />
				Додати запис
			</AlertDialogTrigger>

			<AlertDialogContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-8 p-2 rounded-sm w-full bg-white shadow-2xl'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem className='!mt-1'>
									<FormLabel className=''>Як звати клієнта</FormLabel>
									<FormControl>
										<Input placeholder='Імʼя' {...field} />
									</FormControl>
									<FormMessage className='text-xs'/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='service'
							render={({ field }) => (
								<FormItem className='!mt-1'>
									<FormLabel className=''>Вид послуги</FormLabel>
									<FormControl>
										<Input placeholder='Вид послуги' {...field} />
									</FormControl>
									<FormMessage className='text-xs'/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem className='!mt-1'>
									<FormLabel className=''>Номер телефону</FormLabel>
									<FormControl>
										<InputMask 
											mask="+380 (99) 999-9999" 
											placeholder="+380 (99) 999-9999" 
											slotChar="+380 (__) ___-____"
											className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
											{...field}/>
									</FormControl>
									<FormMessage className='text-xs' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='date'
							render={({ field }) => (
								<FormItem className='!mt-1'>
									<FormLabel className=''>Дата запису</FormLabel>
									<FormControl>
										<InputMask 
											mask="99/99/9999 99:99" 
											placeholder="__/__/____ __:__" 
											slotChar="dd-mm-yyyy hh:mm"
											className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
											{...field}/>
									</FormControl>
									<FormMessage className='text-xs'/>
								</FormItem>
							)}
						/>
						<AlertDialogCancel>Скасувати</AlertDialogCancel>
						<Button type='submit' className='w-full' ref={buttonRef}>
							Записати
						</Button>
					</form>
				</Form>
			</AlertDialogContent>

		</AlertDialog>

	)
}
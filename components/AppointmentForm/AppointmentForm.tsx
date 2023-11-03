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

import { Input } from '@/components/ui/input'

import { TAppointmentSchema, clientAppointmentSchema } from '@/types/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'


import { InputMask } from 'primereact/inputmask';

export default function AppointmentForm() {
	const form = useForm<TAppointmentSchema>({
		resolver: zodResolver(clientAppointmentSchema),
		defaultValues: {
			name: '',
			service: ''
		},
	})

	const onFormSubmit = (values: TAppointmentSchema) => {

		const currentDateTime = `${values.date}:00`;

		const [ day, month, year, time ] = currentDateTime.split(/\/| /)
		const [ hour, minutes, seconds ] = time.split(':');
		const formattedResult = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}Z`

		const changeDate = {
			...values,
			date: formattedResult
		}

		onSubmit(changeDate)
		.then(data => console.log(data))
		form.reset();
	}

	return (
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
				<Button type='submit' className='w-full'>
					Submit
				</Button>
			</form>
		</Form>
	)
}
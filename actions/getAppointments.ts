'use server'

import { TAppointment } from '@/types/types'
import { PrismaClient } from '@prisma/client'

export default async function getAppointments(): Promise<TAppointment[] | string> {

	const prisma = new PrismaClient()


	const getErrorMessage = (error: unknown): string => {
		let message: string;

		if (error instanceof Error){
			message = error.message
		} else if (error && typeof error === 'object' && 'message' in error){
			message = String(error.message)
		} else if (typeof error === 'string'){
			message = error
		} else {
			message = 'Something went wrong.'
		}
		
		return message;

	}

	try{
		
		const appointments: TAppointment[] = await prisma.appointments.findMany()

		return appointments

	} catch(e) {

		console.log(`Не вдається отримати данні на сервері (запит відбувався на сервері). Ось така помилка ${getErrorMessage(e)}`)

		return `Не вдається отримати данні на сервері (запит відбувався на сервері). Ось така помилка ${getErrorMessage(e)}`
		
	}

	// async function fetchAppointments() {
	// 	return new Promise<TAppointment[]>((resolve) => {
	// 		setTimeout(async () => {
	// 			const appointments: TAppointment[] = await prisma.appointments.findMany();
	// 			resolve(appointments);
	// 		}, 3000); 
	// 	});
	// }

	// try {
	// 	const appointments = await fetchAppointments();
	// 	return appointments
	// } catch(e) {

	// 	console.log(`Не вдається отримати данні на сервері (запит відбувався на сервері). Ось така помилка ${getErrorMessage(e)}`)

	// 	return `Не вдається отримати данні на сервері (запит відбувався на сервері). Ось така помилка ${getErrorMessage(e)}`
		
	// }

}
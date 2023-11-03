'use server'

import { TAppointmentSchema, serverAppointmentSchema } from '@/types/types'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export default async function onSubmit(data: TAppointmentSchema) {

	const prisma = new PrismaClient()

	const result = serverAppointmentSchema.safeParse(data)

	if (result.success) {

		const appointmentData = {
			...result.data, 
			canceled: false
		}

		const response = await prisma.appointments.create({
			data: {
				...appointmentData
			}
		})

		revalidatePath('/schedule')

		return response

	} else {
		console.log('error')
	}
}
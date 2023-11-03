'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export default async function cancelAppointment(id: number){
	
	const prisma = new PrismaClient()
	
	const response = await prisma.appointments.update({
		where: {
			id: id,
		},
		data: {
			canceled: true,
		},
	})

	revalidatePath('/schedule')

	return response;
}
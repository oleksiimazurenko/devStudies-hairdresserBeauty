import { z } from 'zod'

export type TAppointment = {
	id: number,
	name: string,
	service: string,
	phone: string,
	date: string,
	canceled: boolean
}

export type ActiveAppointment = Omit<TAppointment, 'canceled'>;

export const clientAppointmentSchema = z.object({
	name: z.string({ required_error: 'Поле не може бути порожнім' }).min(1, 'Поле не може бути порожнім'),
	service: z.string({ required_error: 'Поле не може бути порожнім' }).min(1, 'Поле не може бути порожнім'),
	phone: z.string({ required_error: 'Поле не може бути порожнім' })
	.refine((value) => /\+\d{3} \(\d{2}\) \d{3}-\d{4}/.test(value), {
			message: 'Невірний формат номеру. Правильний формат +380 63 588 3160',
	}),
	date: z.string({ required_error: 'Поле не може бути порожнім' })
	.refine((value) => /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/.test(value), {
			message: 'Невірний формат дати. Правильний формат DD/MM/YYYY HH:mm',
	}),
})

export const serverAppointmentSchema = z.object({
	name: z.string().min(1, 'Поле не може бути порожнім'),
	service: z.string().min(1, 'Поле не може бути порожнім'),
	phone: z.string()
	.refine((value) => /\+\d{3} \(\d{2}\) \d{3}-\d{4}/.test(value), {
			message: 'Невірний формат номеру. Правильний формат +380 63 588 3160',
	}),
	date: z.string()
	.refine((value) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(value), {
			message: 'Невірний формат дати. Правильний формат YYYY-MM-DDTHH:mm:ssZ',
	}),
})

export type TAppointmentSchema = z.infer<typeof clientAppointmentSchema>
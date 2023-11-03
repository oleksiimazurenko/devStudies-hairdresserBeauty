import getAppointments from '@/actions/getAppointments'
import AppointmentList from '@/components/AppointmentList/AppointmentList'

export default async function SchedulePage() {

	const data = await getAppointments()

	return <AppointmentList data={data}/>	
	
}

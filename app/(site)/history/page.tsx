import getAppointments from '@/actions/getAppointments'
import HistoryList from '@/components/HistoryList/HistoryList'

export default async function HistoryPage() {

	const data = await getAppointments()

	return (
		<HistoryList data={data} />
	)

}
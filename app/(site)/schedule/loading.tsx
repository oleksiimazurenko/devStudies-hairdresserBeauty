import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className='grid min-[320px]:grid-cols-1 min-[820px]:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center overflow-y-auto items-center max-[640px]:border max-[640px]:border-solid max-[640px]:divide-gray-500 gap-4 h-[100%] sm:pt-[10px] sm:pb-[40px] overflow-x-hidden'>
			<Skeleton className="border-0 bg-slate-300 w-[210px] min-h-[310px] rounded-t-lg" />
			<Skeleton className="border-0 bg-slate-300 w-[210px] min-h-[310px] rounded-t-lg" />
			<Skeleton className="border-0 bg-slate-300 w-[210px] min-h-[310px] rounded-t-lg" />
			<Skeleton className="border-0 bg-slate-300 w-[210px] min-h-[310px] rounded-t-lg" />
			<Skeleton className="border-0 bg-slate-300 w-[210px] min-h-[310px] rounded-t-lg" />
			<Skeleton className="border-0 bg-slate-300 w-[210px] min-h-[310px] rounded-t-lg" />
		</div>
	)
}
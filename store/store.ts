import { create } from 'zustand'

// type TStatus = 'loading' | 'error' | 'idle';

// type TLoadingStatus = {
//   loadingStatus: TStatus;
//   setLoadingStatus: (status: TStatus) => void;
// } 

// export const useLoadingStatus = create<TLoadingStatus>((set) => ({
//   loadingStatus: 'idle',
//   setLoadingStatus: (status) => set({loadingStatus: status})
// }))

type DateRange = {
		from?: Date | undefined;
    to?: Date | undefined;
}

type TRangeDate = {
  rangeDate: DateRange | undefined;
  setRangeDate: (status: DateRange) => void;
} 

export const useRangeDate = create<TRangeDate>((set) => ({
  rangeDate: {},
  setRangeDate: (status: DateRange) => set({rangeDate: status})
}))
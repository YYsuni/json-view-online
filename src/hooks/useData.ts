import { create } from 'zustand'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useData = create<{ data: any; setData: (data: any) => void }>(set => ({
	data: '',
	setData: (data: boolean) => set({ data })
}))

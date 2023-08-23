import { create } from 'zustand'

export const useData = create<{
	data: any
	setData: (data: any) => void
	editorData: any
	setEditorData: (data: any) => void
}>(set => ({
	data: '',
	setData: (data: any) => set(state => ({ ...state, data })),
	editorData: '',
	setEditorData: (data: any) => set(state => ({ ...state, editorData: data }))
}))

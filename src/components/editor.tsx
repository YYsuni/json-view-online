import { useCallback, useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { useData } from '@/hooks/useData'
import { getStorage, setStorage } from '@/lib/storage'
import { toast } from 'sonner'
import { stringify } from 'react18-json-view'
import { useTheme } from '@/hooks/useTheme'

const example = `return {
	string: 'string',
	longString: 'long string long string long string long string long string long string',
	number: 123456,
	boolean: false,
	null: null,
	func: function () {},
	Symbol: Symbol('JSON View'),
	obj: {
		k1: 123,
		k2: '123',
		k3: false
	},
	arr: ['string', 123456, false, null],
	link: 'https://github.com/'
}`

const keyOfData = 'local'
const initialData = getStorage(keyOfData) || example

export default function Editor() {
	const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
	const monacoEl = useRef(null)
	const { setData, editorData } = useData()

	useEffect(() => {
		if (!editor || !editorData) return

		try {
			editor.setValue(`return ${stringify(editorData, '\t')}`)
		} catch (e) {
			console.warn(e)
		}
	}, [editorData, editor])

	const value2Data = useCallback((value: string) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-implied-eval
			const dataFunc = new Function(value)

			setData(dataFunc())
		} catch (e) {
			console.warn('[eval error]', e)
		}
	}, [])

	useEffect(() => {
		if (monacoEl) {
			setEditor(editor => {
				if (editor) return editor

				const _editor = monaco.editor.create(monacoEl.current!, {
					value: initialData,
					language: 'javascript',
					minimap: { enabled: false },
					scrollbar: {
						vertical: 'hidden'
					},
					tabSize: 2,
					scrollBeyondLastLine: false,
					theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'default'
				})

				value2Data(initialData)
				_editor.getModel()?.onDidChangeContent(event => {
					if (event.changes[0].text.startsWith('return ')) return
					value2Data(_editor.getValue())
				})

				window.addEventListener('resize', () => _editor.layout())

				return _editor
			})
		}

		return () => editor?.dispose()
	}, [monacoEl.current])

	useEffect(() => {
		if (editor) {
			const handler = (event: KeyboardEvent) => {
				if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
					event.preventDefault()
					setStorage(keyOfData, editor?.getValue() || '')
					toast.success('Saved to local storage!')
				}
			}

			window.addEventListener('keydown', handler)

			return () => window.removeEventListener('keydown', handler)
		}
	}, [editor])

	const { theme } = useTheme()

	useEffect(() => {
		if (theme === 'dark') {
			monaco.editor.setTheme('vs-dark')
		} else if (theme === 'light') {
			monaco.editor.setTheme('default')
		} else {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				monaco.editor.setTheme('vs-dark')
			} else {
				monaco.editor.setTheme('default')
			}

			const listener = (event: MediaQueryListEvent) => {
				if (event.matches) {
					monaco.editor.setTheme('vs-dark')
				} else {
					monaco.editor.setTheme('default')
				}
			}

			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener)

			return window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener)
		}
	}, [theme, editor])

	return (
		<div className='w-[55%] p-[50px] bg-theme-#2 json-view-editor dark:bg-[#1CB3E2]/5'>
			<div ref={monacoEl} className='h-full' />
		</div>
	)
}

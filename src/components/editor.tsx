import { useCallback, useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { useData } from '@/hooks/useData'
import { getStorage, setStorage } from '@/lib/storage'
import { toast } from 'sonner'

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
	arr: ['string', 123456, false, null]
}`

const keyOfData = 'local'
const initialData = getStorage(keyOfData) || example

export default function Editor() {
	const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
	const monacoEl = useRef(null)
	const { setData } = useData()

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
					scrollBeyondLastLine: false
				})
				value2Data(initialData)
				_editor.getModel()?.onDidChangeContent(event => {
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

	return (
		<div className='w-[55%] p-[50px] bg-theme-#2 json-view-editor'>
			<div ref={monacoEl} className='h-full' />
		</div>
	)
}

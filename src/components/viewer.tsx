import { useData } from '@/hooks/useData'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import 'react18-json-view/src/dark.css'

export default function Viewer(props: {
	theme: any
	collapseStringsAfterLength?: number
	collapseObjectsAfterLength?: number
}) {
	const { data, setEditorData } = useData()

	return (
		<div className='p-[50px] w-[45%] text-sm overflow-auto'>
			<JsonView src={data} editable matchesURL onChange={({ src }) => setEditorData({ ...src })} {...props} />
		</div>
	)
}

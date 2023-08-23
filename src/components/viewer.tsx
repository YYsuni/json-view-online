import { useData } from '@/hooks/useData'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

export default function Viewer() {
	const { data, setEditorData } = useData()

	return (
		<div className='p-[50px] w-[45%] text-sm overflow-auto'>
			<JsonView src={data} editable onChange={({ src }) => setEditorData({ ...src })} />
		</div>
	)
}

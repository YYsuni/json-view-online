import Background from './components/background'
import Editor from './components/editor'
import Viewer from './components/viewer'
import { Toaster } from 'sonner'

function App() {
	return (
		<>
			<Background>
				<div className='bg-white rounded-[50px] h-full flex overflow-hidden'>
					<Editor />
					<Viewer />
				</div>
			</Background>

			<Toaster />
		</>
	)
}

export default App

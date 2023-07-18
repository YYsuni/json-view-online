import Background from './components/background'
import Editor from './components/editor'
import Viewer from './components/viewer'
import { Toaster } from 'sonner'
import GithubSVG from './svgs/github'

function App() {
	return (
		<>
			<Background>
				<div className='fixed right-0 top-0 p-4 flex justify-end text-[#185049] mb-2'>
					<a className='bg-theme-#2 p-2 rounded-lg' href='https://github.com/YYsuni/json-view-online' target='_blank'>
						<GithubSVG className='w-5 h-5' />
					</a>
				</div>
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

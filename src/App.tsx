import Background from './components/background'
import Editor from './components/editor'
import Viewer from './components/viewer'
import { Toaster } from 'sonner'
import GithubSVG from './svgs/github'
import packageJson from '../package.json'

function App() {
	return (
		<>
			<div className='fixed z-20 right-0 top-0 p-4 flex justify-between w-full text-[#185049] mb-2'>
				<span className='flex items-center text-sm font-bold drop-shadow gap-x-3'>
					<img className='w-8 h-8' src='/favicon.svg' />
					<span>JSON View Online</span>
				</span>

				<a className='bg-theme-#2 p-2 rounded-lg' href='https://github.com/YYsuni/json-view-online' target='_blank'>
					<GithubSVG className='w-5 h-5' />
				</a>
			</div>

			<Background>
				<div className='bg-white rounded-[50px] h-full flex overflow-hidden'>
					<Editor />
					<div className='relative whitespace-nowrap flex justify-center font-mono italic text-black/20 text-sm'>
						<span className='absolute top-2'>{`src =>`}</span>
						<span className='absolute bottom-2'>{`<= JSON.stringify`}</span>
					</div>
					<Viewer />
				</div>
			</Background>

			<div className='fixed z-20 bottom-4 right-4 font-mono text-black/40'>
				{packageJson.dependencies['react18-json-view']}
			</div>

			<Toaster />
		</>
	)
}

export default App

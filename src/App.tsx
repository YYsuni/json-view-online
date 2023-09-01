import Background from './components/background'
import Editor from './components/editor'
import Viewer from './components/viewer'
import { Toaster } from 'sonner'
import GithubSVG from './svgs/github'
import packageJson from '../package.json'
import Theme from './components/theme'
import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ReactComponent as AngleDownSVG } from '@/svgs/angle-down.svg'

const themes = ['default', 'a11y', 'github', 'vscode', 'atom', 'winter-is-coming']

function App() {
	const [theme, setTheme] = useState('default')
	const [stringLength, setStringLength] = useState('')
	const [objectSize, setObjectSize] = useState('')

	return (
		<>
			<div className='fixed z-20 right-0 top-0 p-4 flex justify-between w-full text-[#185049] dark:text-[#1f2d66] mb-2'>
				<span className='flex items-center text-sm font-bold drop-shadow gap-x-3'>
					<img className='w-8 h-8' src='/favicon.svg' />
					<span>JSON View Online</span>
				</span>

				<div className='flex gap-x-2'>
					<a className='bg-theme-#2 p-2 rounded-lg' href='https://github.com/YYsuni/json-view-online' target='_blank'>
						<GithubSVG className='w-5 h-5' />
					</a>
					<Theme />
				</div>
			</div>

			<Background>
				<div className='flex flex-col h-full'>
					<div className='flex gap-x-2'>
						<div className='relative'>
							<p className=' text-xs text-black/40'>theme</p>
							<Listbox value={theme} onChange={setTheme} as='div' style={{ width: 150 }}>
								<Listbox.Button className='px-2 py-1 flex justify-between items-center rounded-lg bg-white/80 border text-sm text-left w-full'>
									{theme}

									<AngleDownSVG />
								</Listbox.Button>
								<Listbox.Options
									as='div'
									className='mt-1 absolute z-10 text-sm bg-white/40 backdrop-blur w-full rounded-lg p-1 border shadow'
								>
									{themes.map(item => (
										<Listbox.Option
											key={item}
											value={item}
											className='p-1 hover:bg-black/5 rounded-lg cursor-pointer'
											as='div'
										>
											{item}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Listbox>
						</div>

						<div>
							<p className='text-xs text-black/40'>collapseStringsAfterLength</p>
							<input
								value={stringLength}
								type='number'
								style={{ width: 160 }}
								placeholder='99'
								onInput={event => {
									const target = event.target as HTMLInputElement

									setStringLength(target.value)
								}}
								className='px-2 py-1 flex justify-between items-center rounded-lg bg-white/80 border text-sm text-left w-full'
							/>
						</div>

						<div>
							<p className='text-xs text-black/40'>collapseObjectsAfterLength</p>
							<input
								value={objectSize}
								type='number'
								style={{ width: 160 }}
								placeholder='99'
								onInput={event => {
									const target = event.target as HTMLInputElement

									setObjectSize(target.value)
								}}
								className='px-2 py-1 flex justify-between items-center rounded-lg bg-white/80 border text-sm text-left w-full'
							/>
						</div>
					</div>

					<div className='bg-white rounded-[50px] mt-2 flex-1 flex overflow-hidden dark:bg-[#0F0E41]'>
						<Editor />
						<div className='relative whitespace-nowrap flex justify-center font-mono italic text-black/20 text-sm'>
							<span className='absolute top-2'>{`src =>`}</span>
							<span className='absolute bottom-2'>{`<= internal stringify`}</span>
						</div>
						<Viewer
							theme={theme}
							collapseStringsAfterLength={stringLength ? +stringLength : undefined}
							collapseObjectsAfterLength={objectSize ? +objectSize : undefined}
						/>
					</div>
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

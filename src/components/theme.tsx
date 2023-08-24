import { ReactComponent as LightSVG } from '@/svgs/light.svg'
import { ReactComponent as DarkSVG } from '@/svgs/dark.svg'
import { ReactComponent as SystemSVG } from '@/svgs/system.svg'
import { useEffect } from 'react'
import { setStorage } from '@/lib/storage'
import { useTheme } from '@/hooks/useTheme'

export default function Theme() {
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setStorage('theme', theme)

		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else if (theme === 'light') {
			document.documentElement.classList.remove('dark')
		} else {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}

			const listener = (event: MediaQueryListEvent) => {
				if (event.matches) {
					document.documentElement.classList.add('dark')
				} else {
					document.documentElement.classList.remove('dark')
				}
			}

			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener)

			return window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener)
		}
	}, [theme])

	return (
		<button
			onClick={() => {
				if (theme === 'light') {
					setTheme('dark')
				} else if (theme === 'dark') {
					setTheme('system')
				} else {
					setTheme('light')
				}
			}}
			className='bg-theme-#2 p-2 rounded-lg'>
			{theme === 'light' ? (
				<LightSVG className='w-4 h-4' />
			) : theme === 'dark' ? (
				<DarkSVG className='w-4 h-4' />
			) : (
				<SystemSVG className='w-4 h-4' />
			)}
		</button>
	)
}

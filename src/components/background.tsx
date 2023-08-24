export default function Background({ children }: PropsWithChildren) {
	return (
		<div className='h-[100vh] overflow-hidden relative'>
			<div className='relative container p-20 h-full'>
				<div className='pointer-events-none'>
					<div className='w-[1000px] h-[1000px] rounded-[300px] bg-theme-#1 dark:bg-[#495992]/50 absolute rotate-[30deg] -translate-x-1/2 -translate-y-1/2' />
					<div className='w-[2000px] h-[2000px] rounded-[600px] bg-theme-#1 dark:bg-[#495992]/50 absolute rotate-[30deg] left-[800px] top-[-400px]' />
				</div>

				<div className='relative z-10 h-full'>{children}</div>
			</div>
		</div>
	)
}

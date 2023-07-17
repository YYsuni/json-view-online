import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	server: {
		port: 1024
	},
	plugins: [react(), tsconfigPaths()],
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.mjs', '.mts']
	}
})

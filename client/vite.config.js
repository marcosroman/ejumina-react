import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'; //https://koha.hashnode.dev/how-to-configure-path-aliases-vite-vue-react

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	resolve: {
    alias: [
			{ find: "@", 
				replacement: path.resolve(__dirname, "src")
			},
			{ find: "@views", 
				replacement: path.resolve(__dirname, "src/views")
			},
			{ find: "@auth", 
				replacement: path.resolve(__dirname, "src/auth")
			},
			{ find: "@forms", 
				replacement: path.resolve(__dirname, "src/forms")
			},
			{ find: "@layouts", 
				replacement: path.resolve(__dirname, "src/layouts")
			},
			{ find: "@static", 
				replacement: path.resolve(__dirname, "src/static")
			},

		],
  },
})

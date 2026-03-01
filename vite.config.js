import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/api' :{ 
  //       target : 'https://career-path-finder-backend-hnipxg8bt-mramanpandits-projects.vercel.app'
  //   }
  // },
  plugins: [react()]
}
)
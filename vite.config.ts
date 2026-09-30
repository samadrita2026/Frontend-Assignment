import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rolldownOptions:{
      input:{
        main:fileURLToPath(new URL('./index.html',import.meta.url )),
        assignment_1:fileURLToPath(new URL('./src/assignment_1/index.html',import.meta.url )),
        assignment_2:fileURLToPath(new URL('./src/assignment_2/info.html',import.meta.url )),
        assignment_3:fileURLToPath(new URL('./src/assignment_3/emp.html',import.meta.url )),
        assignment_4:fileURLToPath(new URL('./src/assignment_4/api.html',import.meta.url )),
        assignment_5:fileURLToPath(new URL('./src/assignment_5/cart.html',import.meta.url )),
        assignment_6:fileURLToPath(new URL('./src/assignment_6/task.html',import.meta.url )),
        assignment_7:fileURLToPath(new URL('./src/assignment_7/authen.html',import.meta.url )),
        
      }
    }
  }
})

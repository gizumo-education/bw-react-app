import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './routes'
import { RecoilRoot } from 'recoil'
import './styles/reset.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ToastContainer />
    <RouterProvider router={router} />
  </RecoilRoot>
)

import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './routes' // import { Top } from './components/pages/Top'
import './styles/reset.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer />
    <RouterProvider router={router} /> {/* <Top />から左記に変更 */}
  </>
)

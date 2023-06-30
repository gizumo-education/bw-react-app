import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Top } from './components/pages/Top'
import './styles/reset.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer />
    <Top />
  </>
)

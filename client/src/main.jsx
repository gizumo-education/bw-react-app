import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './routes' // import { Top } from './components/pages/Top'
import { RecoilRoot } from 'recoil'
import './styles/reset.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot> {/* <> → <RecoilRoot>に変更 */}
    <ToastContainer />
    <RouterProvider router={router} /> {/* <Top />から左記に変更 */}
  </RecoilRoot> // </> → </RecoilRoot>に変更
)

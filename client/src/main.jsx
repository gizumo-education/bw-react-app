import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // 追加
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'
import { router } from './routes' // Topコンポーネントのimportから変更
import './styles/reset.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ToastContainer />
    <RouterProvider router={router} />
  </RecoilRoot>
)

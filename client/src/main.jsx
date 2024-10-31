import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // ルーティングの適用
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './routes' // Topコンポーネントのimportから変更
import './styles/reset.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer />
    <RouterProvider router={router} /> {/* <Top />から左記に変更 */}
  </>
)
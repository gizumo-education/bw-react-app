// 元
// import ReactDOM from 'react-dom/client'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { Top } from './components/pages/Top'
// import './styles/reset.css'
// import './styles/globals.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <>
//     <ToastContainer />
//     <Top />
//   </>
// )


import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'
import { router } from './routes' // Topコンポーネントのimportから変更
import './styles/reset.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ToastContainer />
    <RouterProvider router={router} /> {/* <Top />から左記に変更 */}
  </RecoilRoot>
)
import ReactDOM from 'react-dom/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import { RecoilRoot } from 'recoil'
import { router } from './routes'
import './styles/reset.css'
import './styles/globals.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  // Recoilを使用したいコンポーネントをRecoilRootコンポーネントで囲むことで、Recoilを使用することができる
  <RecoilRoot>
    <ToastContainer />
    <RouterProvider router={router} />
  </RecoilRoot>
)

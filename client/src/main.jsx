import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/reset.css'
import './styles/globals.css'
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ToastContainer />
    {/* 
      RouterProviderコンポーネントはReactRouterのルーティングを適応するためのコンポーネント
      RouterProviderコンポーネントにrouterpropsに先ほど作成した、ルーティング設定を渡すこと
      でルーティングの設定が適応される。
    */}

    <RouterProvider router={router} />
  </RecoilRoot>
)

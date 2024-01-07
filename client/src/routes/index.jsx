import { createBrowserRouter } from 'react-router-dom'

import { Top } from '../components/pages/Top'
import { Completed } from '../components/pages/Completed'

export const router = createBrowserRouter([
  { path: '/', element: <Top /> },
  { path: '/completed', element: <Completed /> }, // 「完了済み」のオブジェクトを追加
])
// createBrowserRouter関数の引数にオブジェクトの配列を渡すことでルーティングの設定が可能
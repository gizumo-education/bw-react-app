import { createBrowserRouter } from 'react-router-dom'

import { Top } from '../components/pages/Top'
import { Completed } from '../components/pages/Completed'

export const router = createBrowserRouter([
  { path: '/', element: <Top /> },
  // ▼練習問題  サイドバーの「完了済み」をクリックすると完了済み一覧ページに遷移する＊＊＊＊＊＊＊＊＊▼
  { path: '/completed', element: <Completed /> }
  // ▲＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▲
])
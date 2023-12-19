import { createBrowserRouter } from 'react-router-dom'

import { Top } from '../components/pages/Top'
import { Completed } from '../components/pages/Completed'

export const router = createBrowserRouter([
  {
    id: 1,
    path: '/',
    element: <Top />
  },
  {
    id: 2,
    path: '/completed',
    element: <Completed />
  },
])
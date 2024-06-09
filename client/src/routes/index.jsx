import { createBrowserRouter } from 'react-router-dom'

import { Top } from '../components/pages/Top'
import { Completed } from '../components/pages/Top/completed'

export const router = createBrowserRouter([
  { path: '/', element: <Top /> },
  { path: '/Completed', element: <Completed /> },
])

// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserRouter } from 'react-router-dom'

import { Top } from '../components/pages/Top'
import { Completed } from '../components/pages/Completed'

// createBrowserRouter関数はReactRouterのルーティングを設定する関数。
// 引数にオブジェクトの配列を渡すことで、ルーティングの設定が可能。
// オブジェクトにはpath、elementプロパティの設定をすることができる。
// pathプロパティには、ルーティングのパスを文字列で指定する。
// elementプロパティには、pathプロパティで指定したパスにアクセスした時
// 表示するコンポーネントを指定する。
// ページを増やしたい時は配列の中にオブジェクトを追加し、pathとelementを
// 適切に指定する。
export const router = createBrowserRouter([
  // 配列にpathとelementのプロパティを持っている。
  // 指定したpathにelementで指定したコンポーネントが表示される。= urlとコンポーネント紐付け
  // (切り替わる？)
  // layoutフォルダのindex.htmlにheaderコンポーネントと
  // sidebarコンポーネントがあるので、そこは固定。
  // 固定しておきたいコンポーネントはlayoutフォルダ内のindex.jsxに定義し、
  { path: '/', element: <Top /> },
  { path: '/completed', element: <Completed /> },
])

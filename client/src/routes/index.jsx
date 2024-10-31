// ルーティング設定
// react-router-domからimportしているcreateBrowserRouter関数は、React Routerのルーティングを設定する関数です。
// createBrowserRouter関数の引数にオブジェクトの配列を渡すことで、ルーティングの設定が可能になります。

// オブジェクトにはpathとelementの2つのプロパティを設定することができます。
// pathプロパティには、ルーティングのパスを文字列で指定します。
// elementプロパティには、pathプロパティで指定したパスにアクセスしたときに表示するコンポーネントを指定します。
// 今回の設定だと、'/'(http://localhost:8000/) にアクセスした時にTopコンポーネントを表示するという設定になっています。
// ページを増やす場合は、配列の中にオブジェクトを追加し、pathとelementを適切に設定することでページを増やしていくことができます。


import { createBrowserRouter } from 'react-router-dom'

import { Top } from '../components/pages/Top'
import { Completed } from '../components/pages/Completed'


export const router = createBrowserRouter([
  { path: '/', element: <Top /> },
  { path: '/completed', element: <Completed /> },
])
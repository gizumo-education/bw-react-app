// routesコンポーネント...ルーティングの設定

import { createBrowserRouter } from 'react-router-dom' 
//createBrowserRouter関数は、React Routerのルーティングを設定する関数

import { Top } from '../components/pages/Top'
// ↓ createBrowserRouter関数の引数にオブジェクトの配列を渡すことで、ルーティングの設定が可能になる
import { Completed } from '../components/pages/Completed'//追加

export const router = createBrowserRouter([
  { path: '/', element: <Top /> }, //オブジェクトにはpathとelementの2つのプロパティを設定することが可能
  { path: '/completed', element:<Completed />}, //追加・練習問題
])
// ↑ページを増やすには、配列のオブジェクトを追加し、pathとelementを適切に指定することで、ページを増やしていける



// ＊ pathプロパティには、ルーティングのパスを文字列で指定する(与えられたurlを指定する。自身で決めることはない)
// ＊ elementプロパティには、pathプロパティで指定したパスにアクセスしたときに表示するコンポーネントを指定git status
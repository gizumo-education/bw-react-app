# レビューされた内容まとめ

・コールバックを書いて受け取っている引数は、コールバックを書いている前の関数が渡してくれている。

# const { name, value } = event.target

# setInputValues((prev) => ({ ...prev, [name]: value }))の

・event.target から name 属性と value をとってきている。
・[]内は変数として扱える。 = オブジェクトの key の部分に、name という変数を割り当てている。

# const handleEditButtonClick = useCallback(

# (id) => {

# setIsAddTaskFormOpen(false)

# setEditTodoId(id)

# const targetTodo = todos.find((todo) => todo.id === id)

# setInputValues({

# title: targetTodo.title,

# description: targetTodo.description,

# })

# },

# [todos]

# )

・更新関数を実行されると実行されているコンポーネント内が再実行される。
・上記のコードを例で言うと setIsAddTaskFormOpen(false),setEditTodoId(id),setInputValues({
title: targetTodo.title,
description: targetTodo.description,
})の三つが同時に実行される。

なので更新関数が実行されているコンポーネント内で、if (editTodoId === todo.id)というような(一部の例)条件式が再実行され更新関数の処理の内容によっては DOM 要素がかわる。

# マウント・レンダリングの違い

## マウント

- 最初に React コンポーネントが DOM に出力される時に行われる、一連の処理。

## レンダリング

- React コンポーネントを DOM に出力するために様々な情報が読み込まれること。

<!--------------------------------------------------------------------------->

- ReactRouting の仕組みを説明する(routes フォルダの index.jsx ファイルに移動して説明)
- ルーティングの設定方法を説明をする。(main.jsx ファイルに移動して説明)
- navlink コンポーネントの説明をする。(navlink コンポーネントに移動して説明。)

<!--------------------------------------------------------------------------->
